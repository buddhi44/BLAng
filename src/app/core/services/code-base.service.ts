import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CodeBaseResponse } from '../entity/Base/codeBaseReponse';

@Injectable({
  providedIn: 'root'
})
export class CodeBaseService {

    constructor(private http: HttpClient) {

    }

    retriveCodeBaseResponse(objectKey: number, query: string) {
        return this.http
            .post<CodeBaseResponse[]>(environment.apiConfig.baseURL + 'CodeBase/readCodes', { requestingElementKey: objectKey, SearchQuery: query });
    }

}
