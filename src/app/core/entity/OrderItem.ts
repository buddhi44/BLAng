
import { AccountResponse } from "./Base/accountResponse";
import { AddressResponse } from "./Base/addressResponse";
import { CodeBaseResponse } from "./Base/codeBaseReponse";
import { ItemResponse } from "./Base/itemResponse";
import { ProjectResponse } from "./Base/projectResponse";
import { UnitResponse } from "./Base/unitResponse";
import { ITaxableLine } from "./contracts/IHeaderCalculation";




export class OrderItem implements ITaxableLine {

    addressKey: number = 1;
    analysisType1: CodeBaseResponse = new CodeBaseResponse();
    analysisType2: CodeBaseResponse = new CodeBaseResponse();
    analysisType3: CodeBaseResponse = new CodeBaseResponse();
    analysisType4: CodeBaseResponse = new CodeBaseResponse();
    availableQuantity: number = 0;
    availableStock: number = 0;
    baringCompany: AccountResponse = new AccountResponse();
    baringCustomer: AccountResponse = new AccountResponse();
    baringPrinciple: AccountResponse = new AccountResponse();
    bussinessUnit: CodeBaseResponse = new CodeBaseResponse();
    companyAmount: number = 0;
    companyPrecentage: number = 0;
    customerAmount: number = 0;
    customerPrecentage: number = 0;
    description: string | null = '';
    discount2Amount: number = 0;
    discount2Percentage: number = 0;
    discountAmount: number = 0;
    discountPercentage: number = 0;
    fromOrderDetailKey: number = 1;
    fromOrderDetKy: number = 1;
    headerDiscountAmount: number = 0;
    insurenceAmount: number = 0;
    insurencePrecentage: number = 0;
    isActive: number = 1;
    isApproved: number = 1;
    isDirty: boolean = false;
    isItemReturned: boolean = false;
    isPendingForIssue: boolean = false;
    isRateInclusiveTT1: boolean = false;
    isRateInclusiveTT2: boolean = false;
    isRateInclusiveTT3: boolean = false;
    isRateInclusiveTT4: boolean = false;
    isRateInclusiveTT5: boolean = false;
    isSupplimentary: number = 0;
    isTransfer: number = 0;
    isTransferConfirmed: number = 0;
    itemTaxType1: number = 0;
    itemTaxType1Per: number = 0;
    itemTaxType2: number = 0;
    itemTaxType2Per: number = 0;
    itemTaxType3: number = 0;
    itemTaxType3Per: number = 0;
    itemTaxType4: number = 0;
    itemTaxType4Per: number = 0;
    itemTaxType5: number = 0;
    itemTaxType5Per: number = 0;
    itemTaxType5Per2: number = 0;
    lineNetTotal: number = 0;
    lineNumber: number = 0;
    lineSubTotal: number = 0;
    lineTotal: number = 0;
    lineTotalWithoutDiscount: number = 0;
    objectKey: number = 1;
    orderDetailKey: number = 1;
    orderDetailsAccountKey1: number = 1;
    orderDetailsAccountKey2: number = 1;
    orderDetailsAccountKey3: number = 1;
    orderItem: ItemResponse = new ItemResponse();
    orderKey: number = 1;
    orderLineLocation: CodeBaseResponse = new CodeBaseResponse();
    orderLineLocation2: CodeBaseResponse = new CodeBaseResponse();
    orderLineProject: ProjectResponse = new ProjectResponse();
    orderType: CodeBaseResponse = new CodeBaseResponse();
    ownerAmount: number = 0;
    ownerPrecentage: number = 0;
    principleAmount: number = 0;
    principlePrecentage: number = 0;
    processDetailsKey: number = 1;
    rate: number = 0;
    referanceOrderDetKey: number = 1;
    remark: string = '';
    requestedQuantity: number = 0;
    requiredDate: Date = new Date();
    resourceAddress: AddressResponse = new AddressResponse();
    supplier: AccountResponse = new AccountResponse();
    supplimentaryNumber: string = '';
    supplimentaryOrderKey: number = 1;
    transactionDiscountAmount: number = 0;
    transactionQuantity: number = 0;
    transactionRate: number = 0;
    transactionUnit: UnitResponse = new UnitResponse();
    transferQuantity: number = 1;
    unit: UnitResponse = new UnitResponse();

    calclulatePreDiscountLineTotal(): number {
        this.lineTotal = this.transactionQuantity * this.transactionRate;
        return this.lineTotal;
    }
    calclulatePostDiscountLineTotal(): number {
        this.lineSubTotal = this.calclulatePreDiscountLineTotal() - this.calculateDiscount();
        return this.lineSubTotal;
    }
    calclulateItemTaxType1Total(): number {
        this.itemTaxType1 = this.calclulatePostDiscountLineTotal() * this.itemTaxType1Per;
        return this.itemTaxType1;
    }
    calclulateItemTaxType2Total(): number {
        this.itemTaxType2 = this.calclulatePostDiscountLineTotal() * this.itemTaxType2Per;
        return this.itemTaxType2;
    }
    calclulateItemTaxType3Total(): number {
        this.itemTaxType3 = this.calclulatePostDiscountLineTotal() * this.itemTaxType3Per;
        return this.itemTaxType3;
    }
    calclulateItemTaxType4Total(): number {
        this.itemTaxType4 = this.calclulatePostDiscountLineTotal() * this.itemTaxType4Per;
        return this.itemTaxType4;
    }
    calclulateItemTaxType5Total(): number {
        this.itemTaxType5 = this.calclulatePostDiscountLineTotal() * this.itemTaxType5Per;
        return this.itemTaxType5;
    }
    calculateTotalTax(): number {
        return 0;
    }
    calculatePostTaxLineTotal(): number {
        this.lineNetTotal = this.calclulatePostDiscountLineTotal() + this.calclulateItemTaxType1Total();
        return this.lineNetTotal;

    }
    calculateDiscount(): number {
        this.transactionDiscountAmount = this.calclulatePreDiscountLineTotal() * this.discountPercentage / 100;
        return this.transactionDiscountAmount;
    }

    calculateBalances() {
        this.calclulatePreDiscountLineTotal();
        this.calclulatePostDiscountLineTotal();
        this.calclulateItemTaxType1Total();
        this.calclulateItemTaxType2Total();
        this.calclulateItemTaxType3Total();
        this.calclulateItemTaxType4Total();
        this.calclulateItemTaxType5Total();
        this.calculatePostTaxLineTotal();
    }

}