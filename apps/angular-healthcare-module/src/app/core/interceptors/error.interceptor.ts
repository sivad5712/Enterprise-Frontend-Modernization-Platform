import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifyService = inject(NotificationService);

  return next(req).pipe(
    catchError((err) => {
      const errorMsg = err.error?.message || err.statusText || 'An unexpected database error occurred.';
      notifyService.show(`API Server Error: ${errorMsg}`, 'danger');
      return throwError(() => err);
    })
  );
};
