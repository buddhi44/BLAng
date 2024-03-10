import { ErrorMessage } from "../../helpers/ui-builder/IBLUIDefinitons";
import { BLOrder } from "../BLOrder";

export interface IHeaderCalculation {


}

export interface IOrderItemCalculation {

}


export interface ITaxableLine {
    itemTaxType1: number;
    itemTaxType2: number;
    itemTaxType3: number;
    itemTaxType4: number;
    itemTaxType5: number;
    itemTaxType1Per: number;
    itemTaxType2Per: number;
    itemTaxType3Per: number;
    itemTaxType4Per: number;
    itemTaxType5Per: number;
    isRateInclusiveTT1: boolean;
    isRateInclusiveTT2: boolean;
    isRateInclusiveTT3: boolean;
    isRateInclusiveTT4: boolean;
    isRateInclusiveTT5: boolean;
    discountPercentage: number;
    discountAmount: number;
    discount2Percentage: number;
    discount2Amount: number;
    lineNetTotal: number;
    lineSubTotal: number;
    headerDiscountAmount: number;
    calclulatePreDiscountLineTotal(): number;
    calclulatePostDiscountLineTotal(): number;
    calculateDiscount(): number;
    calclulateItemTaxType1Total(): number;
    calclulateItemTaxType2Total(): number;
    calclulateItemTaxType3Total(): number;
    calclulateItemTaxType4Total(): number;
    calclulateItemTaxType5Total(): number;
    calculateTotalTax(): number;
    calculatePostTaxLineTotal(): number;



}

export interface IOrderValidation {
    canAddNewItemToGrid(): boolean;
    canSaveTransaction(): boolean;   
    ValidationRules: Array<ValidationRule>;
    errorMessages: ErrorMessage;

}

export class ValidationRule {
    internalElementName!: string;
    IsValueMust!: boolean;
    validationMessage!: string;

}

export class OrderValidation implements IOrderValidation {
    canAddNewItemToGrid(): boolean {

        this.errorMessages.errorMessages.splice(0, this.errorMessages.errorMessages.length);
        if (this.getValidationRuleByName("OrderAddress")) {

            let val = this.getValidationRuleByName("OrderAddress");
            if (val?.IsValueMust && this.orderToValidate.orderAddress.addressKey < 10) {
                this.errorMessages.errorMessages.push("Please select a valid customer.");
            }
        }


        if (this.getValidationRuleByName("OrderLocation")) {

            let val = this.getValidationRuleByName("OrderLocation");
            if (val?.IsValueMust && this.orderToValidate.location.codeKey < 10) {
                this.errorMessages.errorMessages.push("Please select a valid location.");
            }
        }

        if (this.getValidationRuleByName("PayementMethod")) {

            let val = this.getValidationRuleByName("PayementMethod");
            if (val?.IsValueMust && this.orderToValidate.location.codeKey < 10) {
                this.errorMessages.errorMessages.push("Please select a valid payement method.");
            }
        }






        if (this.errorMessages.errorMessages.length > 0) {
            this.errorMessages.isShown = true;

            this.errorMessages.headerTitle = "Cannot add item to the order";
        }
        else {
            this.errorMessages.isShown = false;
        }


        return this.errorMessages.errorMessages.length===0;
    }
    canSaveTransaction(): boolean {
        return true;
    }




    constructor(public ValidationRules: Array<ValidationRule>, private orderToValidate: BLOrder, public errorMessages: ErrorMessage) {

    }


    getValidationRuleByName(name: string): ValidationRule | undefined {

        return this.ValidationRules.find(x => x.internalElementName === name);
    }

}