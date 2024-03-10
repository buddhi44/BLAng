import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UnitComboRequest } from '../entity/Base/comboRequest';
import { UnitResponse } from '../entity/Base/unitResponse';


@Injectable({
  providedIn: 'root'
})
export class UnitService {

    constructor(private http: HttpClient) {

    }

    retriveUnits(comboRequestData: UnitComboRequest) {
        return this.http
            .post<UnitResponse[]>(environment.apiConfig.baseURL + 'unit/readUnits', comboRequestData);
    }
}
