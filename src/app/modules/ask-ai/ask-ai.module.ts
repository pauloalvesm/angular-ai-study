import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskAiComponent } from './components/ask-ai/ask-ai.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ASK_AI_ROUTES } from './routes/ask-ai.routing';

@NgModule({
  declarations: [
    AskAiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ASK_AI_ROUTES)
  ],
  exports: [
    AskAiComponent
  ]
})
export class AskAiModule { }
