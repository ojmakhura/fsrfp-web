import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppEnvStore } from '@app/store/app-env.state';

import { environment } from '@env/environment';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const appStore = inject(AppEnvStore);

  if (!/^(http|https):/i.test(req.url)) {
    req = req.clone({ url: appStore?.env().apiUrl + req.url });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req);
};
