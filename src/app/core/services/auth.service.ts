import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { User } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { CompanyResponse } from '../entity/Company';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;
    private currentUserSubject: BehaviorSubject<User>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    }





    loginUser(user: User) {
        return this.http
            .post<any>(environment.apiConfig.baseURL + 'Authentication/authenticate', user)

    }

    readCompanies() {

        return this.http.post<Array<CompanyResponse>>(environment.apiConfig.baseURL + 'Authentication/getUserCompanies', {});
    }

    updateCompany(companyInfor: CompanyResponse) {
        return this.http.post<any>(environment.apiConfig.baseURL + 'Authentication/updateSelectedCompany', companyInfor);
    }
    public currentUser(): any {
        return null;
    }


    logout() {
        // logout the user
        // return getFirebaseBackend()!.logout();

        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null!);
    }



}

