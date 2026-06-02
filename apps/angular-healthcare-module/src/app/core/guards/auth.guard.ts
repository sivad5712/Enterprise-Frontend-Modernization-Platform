import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  
  // Simulate active session checking (in production, loaded from JWT local storage)
  const userSession = localStorage.getItem('user_session');
  if (userSession) {
    return true;
  }

  // Not logged in, redirect to login page with query parameter returnUrl
  router.navigate(['/login']);
  return false;
};
