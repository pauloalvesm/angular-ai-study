import { Routes, RouterModule } from '@angular/router';
import { GenerateImageComponent } from '../components/generate-image/generate-image.component';

export const GENERATE_IMAGE_ROUTES: Routes = [
  {
    path: '',
    component: GenerateImageComponent,
  },
];

