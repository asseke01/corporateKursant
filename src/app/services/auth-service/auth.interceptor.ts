import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const AUTH_URLS = [
  '/api/news/get_posts/',
  // 'api/employee/login/'
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Проверяем, содержит ли URL запроса один из путей в AUTH_URLS
  const isAuthUrl = AUTH_URLS.some(url => req.url.includes(url));

  if (authToken && !isAuthUrl) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Token ${authToken}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
