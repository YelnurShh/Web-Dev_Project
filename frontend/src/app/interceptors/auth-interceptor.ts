import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token'); // Сақталған токенді аламыз

  if (token) {
    // Егер токен бар болса, оны сұранысқа автоматты түрде қосамыз
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
    return next(cloned);
  }

  // Токен жоқ болса, сұранысты өзгеріссіз жібереміз
  return next(req);
};