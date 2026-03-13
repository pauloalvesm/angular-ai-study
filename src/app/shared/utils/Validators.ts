import { AiResponse } from '../../core/models/ai/AiResponse';
import { ImageRequest } from '../../core/models/ai/ImageRequest';
import { RecipeRequest } from '../../core/models/ai/RecipeRequest';

export class Validators {
  public static validateAskAi(request: AiResponse): boolean {
    if (!request.prompt || request.prompt.trim() === '') {
      return false;
    }
    return true;
  }

  public static validateRecipe(request: RecipeRequest): boolean {
    if (
      !request.ingredients?.trim() ||
      !request.cuisine?.trim() ||
      !request.dietaryRestrictions?.trim()
    ) {
      return false;
    }
    return true;
  }

  public static validateImage(request: ImageRequest): boolean {
    if (!request.prompt?.trim() || !request.quality || !request.quantity) {
      return false;
    }
    return true;
  }
}
