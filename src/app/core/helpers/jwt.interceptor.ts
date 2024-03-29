import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,

    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let tken = localStorage.getItem('access_token');
        if (tken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tken}`,
                },
            });
        }

        return next.handle(request);
    }
}
