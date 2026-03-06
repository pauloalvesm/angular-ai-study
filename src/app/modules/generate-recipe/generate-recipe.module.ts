import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateRecipeComponent } from './components/generate-recipe/generate-recipe.component';
import { FormsModule } from '@angular/forms';
import { GENERATE_RECIPE_ROUTES } from './routes/generate-recipe.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GenerateRecipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(GENERATE_RECIPE_ROUTES)
  ],
  exports: [
      GenerateRecipeComponent
    ]
})
export class GenerateRecipeModule { }
