import { BaseComboResponse } from "./baseComboResponse";

export class ItemResponse extends BaseComboResponse {
    itemKey: number = 1;
    itemCode: string = '';
    itemName: string = '';
    isDefault: boolean = false;

    constructor() {
        super('item-select');
    }
}