import { BaseComboResponse } from "./baseComboResponse";

export class AddressResponse extends BaseComboResponse {

    addressKey: number=1;
    addressName: string='-';
    addressId: string = '-';

    constructor() {
        super('address-combo');
    }
}