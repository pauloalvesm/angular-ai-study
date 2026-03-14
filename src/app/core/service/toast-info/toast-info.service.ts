import { Injectable } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'danger' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(message: string, type: 'success' | 'danger' | 'warning' = 'success'): void {
    this.toasts.push({ message, type });
    setTimeout(() => this.remove(0), 5000);
  }

  remove(index: number): void {
    this.toasts.splice(index, 1);
  }
}
