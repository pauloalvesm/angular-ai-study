import { Component } from '@angular/core';
import { AiService } from '../../../../core/service/ai/ai.service';
import { Validators } from '../../../../shared/utils/Validators';

@Component({
  selector: 'app-ask-ai',
  standalone: false,
  templateUrl: './ask-ai.component.html',
  styleUrl: './ask-ai.component.scss',
})
export class AskAiComponent {
  prompt: string = '';
  chatResponse: string = '';
  isLoading: boolean = false;

  constructor(private aiService: AiService) {}

  askAi(): void {
    if (!Validators.validateAskAi({ prompt: this.prompt } as any)) {
      alert('Please, enter a question!');
      return;
    }

    this.isLoading = true;
    this.chatResponse = '';

    this.aiService.askAi(this.prompt).subscribe({
      next: (response: string) => {
        this.chatResponse = response;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.chatResponse = 'Error obtaining AI response.';
        this.isLoading = false;
      },
    });
  }

  handleClear(): void {
    this.prompt = '';
    this.chatResponse = '';
  }
}
