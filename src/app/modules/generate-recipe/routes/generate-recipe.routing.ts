import { Routes, RouterModule } from '@angular/router';
import { GenerateRecipeComponent } from '../components/generate-recipe/generate-recipe.component';

export const GENERATE_RECIPE_ROUTES: Routes = [
  {
    path: '',
    component: GenerateRecipeComponent,
  },
];
