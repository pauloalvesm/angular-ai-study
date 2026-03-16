import { Component } from '@angular/core';
import { RecipeRequest } from '../../../../core/models/ai/RecipeRequest';
import { AiService } from '../../../../core/service/ai/ai.service';
import { Validators } from '../../../../shared/utils/Validators';
import { ToastService } from '../../../../core/service/toast-info/toast-info.service';

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

  constructor(
    private aiService: AiService,
    private toastService: ToastService
  ) {}

  generateRecipe(): void {
    if (!Validators.validateRecipe(this.request)) {
      this.toastService.show('Fill in all recipe fields!', 'danger');
      return;
    }

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
          this.toastService.show('Recipe generated successfully!', 'success');
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
          this.toastService.show('Error generating recipe. Please try again.', 'danger');
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
    this.toastService.show('Recipe fields cleared.', 'warning');
  }
}
