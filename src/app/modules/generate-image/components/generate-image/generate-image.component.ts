import { Component } from '@angular/core';
import { AiService } from '../../../../core/service/ai/ai.service';
import { ImageRequest } from '../../../../core/models/ai/ImageRequest';
import { Validators } from '../../../../shared/utils/Validators';
import { ToastService } from '../../../../core/service/toast-info/toast-info.service';

@Component({
  selector: 'app-generate-image',
  standalone: false,
  templateUrl: './generate-image.component.html',
  styleUrl: './generate-image.component.scss'
})
export class GenerateImageComponent {

  request: ImageRequest = {
    prompt: '',
    quality: 'hd',
    quantity: 1,
  };

  imagesResponse: string[] = [];
  isLoading: boolean = false;

  constructor(
    private aiService: AiService,
    private toastService: ToastService
  ) {}

  generateImage(): void {
    if (!Validators.validateImage(this.request)) {
      this.toastService.show('Fill in all image fields!', 'danger');
      return;
    }

    this.isLoading = true;
    this.imagesResponse = [];

    this.aiService
      .generateImage(
        this.request.prompt,
        this.request.quality,
        this.request.quantity,
      )
      .subscribe({
        next: (response: string[]) => {
          this.imagesResponse = response;
          this.isLoading = false;
          this.toastService.show('Images generated successfully!', 'success');
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
          this.toastService.show('Error generating images. Please try again.', 'danger');
        },
      });
  }

  handleClear(): void {
    this.request = {
      prompt: '',
      quality: 'hd',
      quantity: 1,
    };
    this.imagesResponse = [];
    this.toastService.show('Image fields cleared.', 'warning');
  }

}
