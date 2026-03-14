import { Component } from '@angular/core';
import { ToastService } from '../../../core/service/toast-info/toast-info.service';

@Component({
  selector: 'app-toast-container',
  standalone: false,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
