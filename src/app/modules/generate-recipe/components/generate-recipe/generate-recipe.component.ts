import { Component } from '@angular/core';
import { RecipeRequest } from '../../../../core/models/ai/RecipeRequest';
import { AiService } from '../../../../core/service/ai/ai.service';

@Component({
  selector: 'app-generate-recipe',
  standalone: false,
  templateUrl: './generate-recipe.component.html',
  styleUrl: './generate-recipe.component.scss',
})
export class GenerateRecipeComponent {
  request: RecipeRequest = {
    ingredients: '',
    cuisine: 'Any',
    dietaryRestrictions: 'None',
  };

  recipeResponse: string = '';
  isLoading: boolean = false;

  constructor(private aiService: AiService) {}

  generateRecipe(): void {
    if (!this.request.ingredients.trim()) return;

    this.isLoading = true;
    this.recipeResponse = '';

    this.aiService
      .generateRecipe(
        this.request.ingredients,
        this.request.cuisine,
        this.request.dietaryRestrictions,
      )
      .subscribe({
        next: (response: string) => {
          this.recipeResponse = response;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.recipeResponse = 'Error generating recipe. Please try again.';
          this.isLoading = false;
        },
      });
  }

  handleClear(): void {
    this.request = {
      ingredients: '',
      cuisine: 'Any',
      dietaryRestrictions: 'None',
    };
    this.recipeResponse = '';
  }
}
