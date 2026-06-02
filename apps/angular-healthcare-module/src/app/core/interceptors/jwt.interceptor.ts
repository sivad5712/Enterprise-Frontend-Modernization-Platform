import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionStr = localStorage.getItem('user_session');
  let authReq = req;

  if (sessionStr) {
    const session = JSON.parse(sessionStr);
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token || 'mock-jwt-token-12345'}`
      }
    });
  }

  return next(authReq);
};
