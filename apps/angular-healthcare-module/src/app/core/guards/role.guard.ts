import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const expectedRoles = route.data['expectedRoles'] as string[];

  const userSessionStr = localStorage.getItem('user_session');
  if (userSessionStr) {
    const userSession = JSON.parse(userSessionStr);
    const hasRole = expectedRoles.includes(userSession.role);
    
    if (hasRole) return true;
  }

  // Unauthorized, redirect to main dashboards
  router.navigate(['/']);
  return false;
};
