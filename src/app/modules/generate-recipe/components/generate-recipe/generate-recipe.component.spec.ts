import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateRecipeComponent } from './generate-recipe.component';
import { AiService } from '../../../../core/service/ai/ai.service';
import { ToastService } from '../../../../core/service/toast-info/toast-info.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Validators } from '../../../../shared/utils/Validators';

describe('GenerateRecipeComponent', () => {
  let component: GenerateRecipeComponent;
  let fixture: ComponentFixture<GenerateRecipeComponent>;
  let aiServiceMock: jasmine.SpyObj<AiService>;
  let toastServiceMock: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    aiServiceMock = jasmine.createSpyObj('AiService', ['generateRecipe']);
    toastServiceMock = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [GenerateRecipeComponent],
      imports: [FormsModule],
      providers: [
        { provide: AiService, useValue: aiServiceMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generateRecipe()', () => {
    it('should show error toast when validation fails', () => {
      spyOn(Validators, 'validateRecipe').and.returnValue(false);

      component.generateRecipe();

      expect(toastServiceMock.show).toHaveBeenCalledWith('Fill in all recipe fields!', 'danger');
      expect(aiServiceMock.generateRecipe).not.toHaveBeenCalled();
    });

    it('should update recipeResponse on success', () => {
      const mockResponse = 'Delicious Recipe Content';
      spyOn(Validators, 'validateRecipe').and.returnValue(true);
      aiServiceMock.generateRecipe.and.returnValue(of(mockResponse));

      component.request = {
        ingredients: 'Tomato, Cheese',
        cuisine: 'Italian',
        dietaryRestrictions: 'None'
      };

      component.generateRecipe();

      expect(component.isLoading).toBeFalse();
      expect(component.recipeResponse).toBe(mockResponse);
      expect(toastServiceMock.show).toHaveBeenCalledWith('Recipe generated successfully!', 'success');
    });

    it('should handle error when service fails', () => {
      spyOn(Validators, 'validateRecipe').and.returnValue(true);
      aiServiceMock.generateRecipe.and.returnValue(throwError(() => new Error('API Error')));
      spyOn(console, 'error');

      component.generateRecipe();

      expect(component.isLoading).toBeFalse();
      expect(toastServiceMock.show).toHaveBeenCalledWith('Error generating recipe. Please try again.', 'danger');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('handleClear()', () => {
    it('should reset request fields and clear response', () => {
      component.request = {
        ingredients: 'Onion',
        cuisine: 'French',
        dietaryRestrictions: 'Vegan'
      };
      component.recipeResponse = 'Existing Recipe';

      component.handleClear();

      expect(component.request.ingredients).toBe('');
      expect(component.request.cuisine).toBe('Any');
      expect(component.request.dietaryRestrictions).toBe('None');
      expect(component.recipeResponse).toBe('');
      expect(toastServiceMock.show).toHaveBeenCalledWith('Recipe fields cleared.', 'warning');
    });
  });
});
