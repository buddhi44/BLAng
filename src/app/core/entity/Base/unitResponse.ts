import { BaseComboResponse } from "./baseComboResponse";


export class UnitResponse extends BaseComboResponse {
    unitName: string = '';
    unitKey: number = 1;
    isDefault: boolean = false;


    constructor() {
        super('unit-combo');
    }
}