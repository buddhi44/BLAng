

export class ComboRequest {

    entityKey: number = 1;
    requestingElementKey: number = 1;
    previousKey: number = 1;
    transactionTypeKey: number = 1;
    searchQuery: string = '';

}


export class UnitComboRequest extends ComboRequest {
    itemKey: number = 1;
}