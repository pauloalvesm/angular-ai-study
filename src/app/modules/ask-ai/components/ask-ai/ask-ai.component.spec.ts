import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskAiComponent } from './ask-ai.component';
import { AiService } from '../../../../core/service/ai/ai.service';
import { ToastService } from '../../../../core/service/toast-info/toast-info.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Validators } from '../../../../shared/utils/Validators';

describe('AskAiComponent', () => {
  let component: AskAiComponent;
  let fixture: ComponentFixture<AskAiComponent>;
  let aiServiceMock: jasmine.SpyObj<AiService>;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    aiServiceMock = jasmine.createSpyObj('AiService', ['askAi']);
    toastServiceMock = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [AskAiComponent],
      imports: [FormsModule],
      providers: [
        { provide: AiService, useValue: aiServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AskAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('askAi()', () => {
    it('should show error toast if prompt is invalid via Validators', () => {
      spyOn(Validators, 'validateAskAi').and.returnValue(false);

      component.prompt = '';
      component.askAi();

      expect(toastServiceMock.show).toHaveBeenCalledWith('Please, enter a question!', 'danger');
      expect(aiServiceMock.askAi).not.toHaveBeenCalled();
    });

    it('should process AI response successfully and update states', () => {
      const mockResponse = 'AI Response';
      spyOn(Validators, 'validateAskAi').and.returnValue(true);
      aiServiceMock.askAi.and.returnValue(of(mockResponse));

      component.prompt = 'What is the capital of France?';
      component.askAi();

      expect(component.isLoading).toBeFalse();
      expect(component.chatResponse).toBe(mockResponse);
      expect(toastServiceMock.show).toHaveBeenCalledWith('Response generated successfully!', 'success');
    });

    it('should handle error in AI service call and reset loading', () => {
      spyOn(Validators, 'validateAskAi').and.returnValue(true);
      aiServiceMock.askAi.and.returnValue(throwError(() => new Error('API Error')));
      spyOn(console, 'error');

      component.prompt = 'Test error';
      component.askAi();

      expect(component.isLoading).toBeFalse();
      expect(toastServiceMock.show).toHaveBeenCalledWith('Error obtaining AI response.', 'danger');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('handleClear()', () => {
    it('should clear prompt and chatResponse properties and trigger toast', () => {
      component.prompt = 'Test text';
      component.chatResponse = 'Test response';

      component.handleClear();

      expect(component.prompt).toBe('');
      expect(component.chatResponse).toBe('');
      expect(toastServiceMock.show).toHaveBeenCalledWith('Fields cleared.', 'warning');
    });
  });
});
