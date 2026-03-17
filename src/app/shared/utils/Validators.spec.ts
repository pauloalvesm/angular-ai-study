import { Validators } from './Validators';
import { AiResponse } from '../../core/models/ai/AiResponse';
import { RecipeRequest } from '../../core/models/ai/RecipeRequest';
import { ImageRequest } from '../../core/models/ai/ImageRequest';

describe('Validators', () => {

  describe('validateAskAi', () => {
    it('should return true for a valid prompt', () => {
      // Criamos um objeto completo para satisfazer a interface AiResponse
      const request: AiResponse = {
        prompt: 'What is Angular?',
        answer: '',
        timestamp: new Date()
      };
      expect(Validators.validateAskAi(request)).toBeTrue();
    });

    it('should return false if prompt is empty string', () => {
      const request = { prompt: '' } as AiResponse;
      expect(Validators.validateAskAi(request)).toBeFalse();
    });

    it('should return false if prompt is only whitespace', () => {
      const request = { prompt: '    ' } as AiResponse;
      expect(Validators.validateAskAi(request)).toBeFalse();
    });

    it('should return false if prompt is null or undefined', () => {
      // @ts-ignore
      expect(Validators.validateAskAi({ prompt: null } as any)).toBeFalse();
    });
  });

  describe('validateRecipe', () => {
    it('should return true when all fields are valid', () => {
      const request: RecipeRequest = {
        ingredients: 'Tomato',
        cuisine: 'Italian',
        dietaryRestrictions: 'None'
      };
      expect(Validators.validateRecipe(request)).toBeTrue();
    });

    it('should return false if any field is empty or whitespace', () => {
      expect(Validators.validateRecipe({ ingredients: '', cuisine: 'any', dietaryRestrictions: 'any' } as RecipeRequest)).toBeFalse();
      expect(Validators.validateRecipe({ ingredients: 'any', cuisine: ' ', dietaryRestrictions: 'any' } as RecipeRequest)).toBeFalse();
      expect(Validators.validateRecipe({ ingredients: 'any', cuisine: 'any', dietaryRestrictions: '' } as RecipeRequest)).toBeFalse();
    });
  });

  describe('validateImage', () => {
    it('should return true when all fields are valid', () => {
      const request: ImageRequest = {
        prompt: 'A blue cat',
        quality: 'hd',
        quantity: 1
      };
      expect(Validators.validateImage(request)).toBeTrue();
    });

    it('should return false if prompt is missing', () => {
      const request: ImageRequest = { prompt: '', quality: 'hd', quantity: 1 };
      expect(Validators.validateImage(request)).toBeFalse();
    });

    it('should return false if quality or quantity is missing (negative scenario)', () => {
      // @ts-ignore
      expect(Validators.validateImage({ prompt: 'cat', quality: null, quantity: 1 } as any)).toBeFalse();
      // @ts-ignore
      expect(Validators.validateImage({ prompt: 'cat', quality: 'hd', quantity: 0 } as any)).toBeFalse();
    });
  });

});
