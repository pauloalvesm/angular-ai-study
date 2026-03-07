import { Component } from '@angular/core';
import { AiService } from '../../../../core/service/ai/ai.service';
import { ImageRequest } from '../../../../core/models/ai/ImageRequest';

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

  constructor(private aiService: AiService) {}

  generateImage(): void {
    if (!this.request.prompt.trim()) return;

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
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
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
  }

}
