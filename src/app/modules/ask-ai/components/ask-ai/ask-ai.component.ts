import { Component } from '@angular/core';
import { AiService } from '../../../../core/service/ai/ai.service';
import { Validators } from '../../../../shared/utils/Validators';
import { ToastService } from '../../../../core/service/toast-info/toast-info.service';

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

  constructor(
    private aiService: AiService,
    private toastService: ToastService
  ) {}

  askAi(): void {
    if (!Validators.validateAskAi({ prompt: this.prompt } as any)) {
      this.toastService.show('Please, enter a question!', 'danger');
      return;
    }

    this.isLoading = true;
    this.chatResponse = '';

    this.aiService.askAi(this.prompt).subscribe({
      next: (response: string) => {
        this.chatResponse = response;
        this.isLoading = false;
        this.toastService.show('Response generated successfully!', 'success');
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        this.toastService.show('Error obtaining AI response.', 'danger');
      },
    });
  }

  handleClear(): void {
    this.prompt = '';
    this.chatResponse = '';
    this.toastService.show('Fields cleared.', 'warning');
  }
}
