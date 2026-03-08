import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateImageComponent } from './components/generate-image/generate-image.component';
import { FormsModule } from '@angular/forms';
import { GENERATE_IMAGE_ROUTES } from './routes/generate-image.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GenerateImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(GENERATE_IMAGE_ROUTES)
  ],
  exports: [
      GenerateImageComponent
    ]
})
export class GenerateImageModule { }
