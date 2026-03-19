import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateImageComponent } from './generate-image.component';
import { AiService } from '../../../../core/service/ai/ai.service';
import { ToastService } from '../../../../core/service/toast-info/toast-info.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Validators } from '../../../../shared/utils/Validators';

describe('GenerateImageComponent', () => {
  let component: GenerateImageComponent;
  let fixture: ComponentFixture<GenerateImageComponent>;
  let aiServiceMock: jasmine.SpyObj<AiService>;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    aiServiceMock = jasmine.createSpyObj('AiService', ['generateImage']);
    toastServiceMock = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [GenerateImageComponent],
      imports: [FormsModule],
      providers: [
        { provide: AiService, useValue: aiServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generateImage()', () => {
    it('should show error toast when validation fails', () => {
      spyOn(Validators, 'validateImage').and.returnValue(false);

      component.generateImage();

      expect(toastServiceMock.show).toHaveBeenCalledWith('Fill in all image fields!', 'danger');
      expect(aiServiceMock.generateImage).not.toHaveBeenCalled();
    });

    it('should update imagesResponse with array on success', () => {
      const mockResponse = ['url1.png', 'url2.png'];
      spyOn(Validators, 'validateImage').and.returnValue(true);
      aiServiceMock.generateImage.and.returnValue(of(mockResponse));

      component.request = {
        prompt: 'A sunset over the ocean',
        quality: 'hd',
        quantity: 2
      };

      component.generateImage();

      expect(component.isLoading).toBeFalse();
      expect(component.imagesResponse).toEqual(mockResponse);
      expect(toastServiceMock.show).toHaveBeenCalledWith('Images generated successfully!', 'success');
    });

    it('should handle service error and stop loading', () => {
      spyOn(Validators, 'validateImage').and.returnValue(true);
      aiServiceMock.generateImage.and.returnValue(throwError(() => new Error('Service Error')));
      spyOn(console, 'error');

      component.generateImage();

      expect(component.isLoading).toBeFalse();
      expect(toastServiceMock.show).toHaveBeenCalledWith('Error generating images. Please try again.', 'danger');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('handleClear()', () => {
    it('should reset request to default values and clear response array', () => {
      component.request = {
        prompt: 'Modified prompt',
        quality: 'standard',
        quantity: 5
      };
      component.imagesResponse = ['image.jpg'];

      component.handleClear();

      expect(component.request.prompt).toBe('');
      expect(component.request.quality).toBe('hd');
      expect(component.request.quantity).toBe(1);
      expect(component.imagesResponse.length).toBe(0);
      expect(toastServiceMock.show).toHaveBeenCalledWith('Image fields cleared.', 'warning');
    });
  });
});
