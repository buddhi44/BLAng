import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BLMenuItem } from '../../layouts/sidebar/menu.model';
import { UIObject } from '../entity/UIObject';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    constructor(private http: HttpClient) {
     
    }


    retriveMenuDetails() {
        return this.http
            .get<BLMenuItem>(environment.apiConfig.baseURL + 'Object/FetchSideMenu');

    }

    retriveUIObject(menuKey: number) {
        return this.http
            .post<UIObject>(environment.apiConfig.baseURL + 'Object/fetchObjects', {menuKey:menuKey});
    }
}
