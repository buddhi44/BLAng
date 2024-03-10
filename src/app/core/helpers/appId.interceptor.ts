import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { environment } from '../../../environments/environment';



@Injectable()
export class AppIDInterceptor implements HttpInterceptor {
    constructor(
     
      
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        
        // add authorization header with jwt token if available
        let appId = environment.apiConfig.applicationId;
        if (appId) {
                request = request.clone({
                    setHeaders: {
                        IntegrationID: appId,
                    },
                });
            }
    
        return next.handle(request);
    }
}
