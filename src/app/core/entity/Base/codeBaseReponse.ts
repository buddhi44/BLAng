import { BaseComboResponse } from "./baseComboResponse";


export class CodeBaseResponse extends BaseComboResponse {
    codeKey: number = 1;
    codeName: string = '-';
    code: string = '';
    isDefault: boolean = false;

  
    constructor() {
        super('codeBase-combo');
    }
}