import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';

import { environment } from '../../../environments/environment';
import { JWTDecoder } from '../helpers/jwtdecoder/jwt.decorder';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private jwtDecoder: JWTDecoder

    ) {
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.jwtDecoder.isCompanyAuthSuccess()) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate([this.jwtDecoder.getRedirectionPath()], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.jwtDecoder.isCompanyAuthSuccess()) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate([this.jwtDecoder.getRedirectionPath()], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
