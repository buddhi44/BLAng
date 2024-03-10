import { Injectable } from "@angular/core";
import { JwtHelperService} from "@auth0/angular-jwt";



@Injectable({ providedIn: 'root' })
export class JWTDecoder {

    private raw_token: string | null = null;
    private decoded_token: any;
    helper = new JwtHelperService();


    isValidToken(): boolean {
        this.raw_token = localStorage.getItem("access_token");
        if (this.raw_token == null) {
            return false;
        }
        let isExpierd = this.helper.isTokenExpired(this.raw_token);

 
        this.getDecodedToken();

        // now we have a decoded token for the set

        return !isExpierd;

    }

    getUserDetails() {
        if (this.isValidToken()) {
            if (this.decoded_token != null) {
                return this.decoded_token.ID;

            }
        }
        return "Invalid";
    }


    private getDecodedToken() {

        this.decoded_token = this.helper.decodeToken(this.raw_token as string);
     
    }

    isCompanyAuthSuccess() {
        return this.isValidToken() && this.decoded_token.CCD != undefined;
    }

    getRedirectionPath(): string {
        if (this.isCompanyAuthSuccess()) {
            return '';
        }
        if (this.isValidToken()) {
            return '/auth/organisation';
        }
        return '/auth/login';
    }

}