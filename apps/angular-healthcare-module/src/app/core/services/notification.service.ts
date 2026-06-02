import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertNotification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private alertsSubject = new BehaviorSubject<AlertNotification[]>([]);
  alerts$: Observable<AlertNotification[]> = this.alertsSubject.asObservable();

  constructor() {}

  show(message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info') {
    const current = this.alertsSubject.value;
    const notification: AlertNotification = {
      id: `alert-${Math.random().toString(36).substr(2, 9)}`,
      message,
      type,
      timestamp: new Date()
    };
    this.alertsSubject.next([notification, ...current]);

    // Automatically dismiss after 4 seconds
    setTimeout(() => {
      this.dismiss(notification.id);
    }, 4000);
  }

  dismiss(id: string) {
    const filtered = this.alertsSubject.value.filter(n => n.id !== id);
    this.alertsSubject.next(filtered);
  }
}
