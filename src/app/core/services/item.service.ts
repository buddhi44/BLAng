import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ItemResponse } from '../entity/Base/itemResponse';
import { RateAndStockReadRequest, RateAndStockResponse } from '../entity/Request/rateRetrivalRequet';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


    constructor(private http: HttpClient) {

    }

    retriveItemsForTransaction(objectKey: number, query: string) {
        return this.http
            .post<ItemResponse[]>(environment.apiConfig.baseURL + 'item/getItemsForTransactionJson', { requestingElementKey: objectKey, SearchQuery: query });
    }

    retriveItemStockAndRate(request: RateAndStockReadRequest) {
        return this.http
            .post<RateAndStockResponse>(environment.apiConfig.baseURL + 'item/getItemRateAndStockPOS', request);
    }

}
