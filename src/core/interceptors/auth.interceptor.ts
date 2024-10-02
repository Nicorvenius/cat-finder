import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'x-api-key': environment.apiKey
    }
  });

  return next(modifiedReq);
};
