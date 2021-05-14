import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        
    if (
      environment.apiUrl &&
      !req.url.startsWith('/assets/') &&
      !req.url.startsWith('https://')
    ) {
      req = req.clone({
        url: environment.apiUrl + req.url
      });
    } else {
      req = req.clone({
        url: req.url
      });
    }    

    return next.handle(req);
  }
}