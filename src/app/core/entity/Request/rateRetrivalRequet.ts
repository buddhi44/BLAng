import { CodeBaseResponse } from "../Base/codeBaseReponse";

export class RateAndStockReadRequest {
    objectKey: number = 1;
    itemKey: number = 1;
    effectiveDate!: Date;
    bussienssUnitKey: number = 1;
    projectKey: number = 1;
    addressKey: number = 1;
    accountKey: number = 1;
    payementTermKey: number = 1;
    code1Key: number = 1;
    code2Key: number = 1;
    transactionUnitKey: number = 1;
    locationKey: number = 1;
    conditionCode: string = '';
}


export class ItemRateResponse  {
    transactionRate: number=0;
    discountPercentage: number=0;
    itemTaxType1: number=0;
    itemTaxType2: number=0;
    itemTaxType3: number=0;
    itemTaxType4: number=0;
    itemTaxType5: number=0;
    itemTaxType5Per2: number=0;
    unitKey: number=1;  
    rateItem!: ItemRateResponse;
    rate: number=0;
    splitLength: number=0;
    markUpPercentage: number=0;
    minimumSalesPrice: number=0;
    weight: number=0;
    length: number=0;
    convRate: number = 0;
    hasSuperSeedItems: boolean = false;
    hasSubstitudeItems: boolean = false;
    itemType!: CodeBaseResponse;
    availableQuantiy: number=0;
}


export class StockAsAtResponse {
    itemKey: number=1;
    stockAsAt: number = 0;
    isLocked: boolean = false;
    isAlwMinusQty: boolean = false;
    stockAsAtLocation!: CodeBaseResponse;
}


export class RateAndStockResponse {
    rateResponse!: ItemRateResponse;
    stockResponse!: StockAsAtResponse;
    hasSerialCheck: boolean = false;
}