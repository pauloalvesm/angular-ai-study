import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { AskAiModule } from './modules/ask-ai/ask-ai.module';
import { GenerateRecipeModule } from './modules/generate-recipe/generate-recipe.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    AskAiModule,
    GenerateRecipeModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
