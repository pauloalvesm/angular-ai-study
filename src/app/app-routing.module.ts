import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'ask-ai',
    loadChildren: () => import('./modules/ask-ai/ask-ai.module').then(m => m.AskAiModule)
  },
  {
    path: 'generate-recipe',
    loadChildren: () => import('./modules/generate-recipe/generate-recipe.module').then(m => m.GenerateRecipeModule)
  },
  {
    path: 'generate-image',
    loadChildren: () => import('./modules/generate-image/generate-image.module').then(m => m.GenerateImageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
