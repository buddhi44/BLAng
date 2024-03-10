import { AccountResponse } from "./Base/accountResponse";
import { AddressResponse } from "./Base/addressResponse";
import { CodeBaseResponse } from "./Base/codeBaseReponse";
import { ProjectResponse } from "./Base/projectResponse";
import { OrderItem } from "./OrderItem";


export class BLOrder {
    orderKey: number = 1;;
    orderNumber: string | null = '';
    isHold: boolean = false;
    orderDocumentNumber: string | null = '';

    orderDate: Date = new Date();
    orderFinishDate: Date = new Date();
    deliveryDate: Date = new Date();
    location: CodeBaseResponse = new CodeBaseResponse();
    location2: CodeBaseResponse = new CodeBaseResponse();
    orderPaymentTerm: CodeBaseResponse = new CodeBaseResponse();
    orderAddress: AddressResponse = new AddressResponse();
    orderRepAddress: AddressResponse = new AddressResponse();
    orderAccount: AccountResponse = new AccountResponse();
    orderType: CodeBaseResponse = new CodeBaseResponse();
    lineItems: OrderItem[] = [];
    formObjectKey: number = 1;
    objectKey: number = 1;
    headerDiscountPercentage: number = 0;
    bussinessUnit: CodeBaseResponse = new CodeBaseResponse();
    fromOrderKey: number = 1;
    isFromQuotation: boolean = false;
    description: string | null = '';
    orderApproveState: CodeBaseResponse = new CodeBaseResponse();
    orderPrefix: CodeBaseResponse = new CodeBaseResponse();
    orderCategory1: CodeBaseResponse = new CodeBaseResponse();
    orderCategory2: CodeBaseResponse = new CodeBaseResponse();
    orderCategory3: CodeBaseResponse = new CodeBaseResponse();
    orderStatus: CodeBaseResponse = new CodeBaseResponse();
    orderControlCondition: CodeBaseResponse = new CodeBaseResponse();
    orderProject: ProjectResponse = new ProjectResponse();
    code1Key: number = 1;
    meterReading: number = 0;
    insurance: AccountResponse = new AccountResponse();
    isIRNEstimateOrder: boolean = false;
    isSupplimentaryEstimateOrder: boolean = false;
    baringHeaderPrincipleAccount: AccountResponse = new AccountResponse();
    principalPercentage: number = 0;
    principalAmount: number = 0;
    baringHeaderCompanyAccount: AccountResponse = new AccountResponse();;
    companyPercentage: number = 0;
    companyAmount: number = 0;
    customerPrecentage: number = 0;
    customerAmount: number = 0;
    orderAccountKey1: number = 1;
    orderAccountKey2: number = 1;
    orderAccountKey3: number = 1; 
    remarks: string | null = '';
    insurencePrecentage: number = 0;
    insurenceAmount: number = 0;
    ownerPrecentage: number = 0;
    ownerAmount: number = 0;
    addressCategory1: CodeBaseResponse = new CodeBaseResponse();
    addressCategory2: CodeBaseResponse = new CodeBaseResponse()
    addressCategory3: CodeBaseResponse = new CodeBaseResponse();
    orderYourReference: string | null = '';
    prefixedOrderNumber: string = '';
    address2: AddressResponse = new AddressResponse();
    isActive: number = 1;
    isApprove: number = 1;

    headerDiscountAmount: number = 0;
    discountPercentage: number = 0;
    discountAmount: number = 0;
    shift: CodeBaseResponse = new CodeBaseResponse();
    shiftDate: Date = new Date();;
    workStationKy: number = 1;
    amount: number = 0;
    nextLineNumber: number = 1;
    currentItem?: OrderItem = undefined;

    transactionDiscountAmount: number = 0;
    transactionAmount: number = 0;

    createNewOrderItem(): OrderItem {

        let newOrderItem = new OrderItem();
        newOrderItem.orderLineLocation = this.location;
        newOrderItem.orderLineProject = this.orderProject;
        newOrderItem.addressKey = this.orderAddress.addressKey;        
        newOrderItem.lineNumber = this.nextLineNumber++;
        this.currentItem = newOrderItem;
        return newOrderItem;

    }

    calculateBalances() {

        this.lineItems.forEach((item) => {
            item.calculateBalances();
            this.transactionDiscountAmount += item.transactionDiscountAmount;
            this.amount += item.calclulatePostDiscountLineTotal();
            this.transactionAmount = item.calclulatePreDiscountLineTotal();

        });
    }


    constructor() {

    }
}

