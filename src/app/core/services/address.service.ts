import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AddressResponse } from '../entity/Base/addressResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

    constructor(private http: HttpClient) {

    }

    retriveAddessResponses(objectKey: number, query: string) {
        return this.http
            .post<AddressResponse[]>(environment.apiConfig.baseURL + 'Address/readAddress', { requestingElementKey: objectKey, SearchQuery: query });
    }
}
