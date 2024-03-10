import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BLOrder } from '../entity/BLOrder';
import { FindOrderRequest } from '../entity/Request/findOrderRequest';
import { FindOrderResponse } from '../entity/Response/findOrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {

    }

    orderService(order: BLOrder) {
        return this.http
            .post<BLOrder>(environment.apiConfig.baseURL + 'order/saveOrder', order);
    }


    findOrder(findRequest: FindOrderRequest) {
        return this.http
            .post<FindOrderResponse[]>(environment.apiConfig.baseURL + 'order/findOrders', findRequest);
    }


}
