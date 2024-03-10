import { AccountResponse } from "../Base/accountResponse";
import { AddressResponse } from "../Base/addressResponse";
import { CodeBaseResponse } from "../Base/codeBaseReponse";
import { ProjectResponse } from "../Base/projectResponse";

export class FindOrderRequest {

    orderNumber: string = '';
    objectKey: number = 1;
    documentNumber: string = '';
    fromDate: Date = new Date();
    toDate: Date = new Date();
    location: CodeBaseResponse = new CodeBaseResponse();
    project: ProjectResponse = new ProjectResponse();
    address: AddressResponse = new AddressResponse();
    prefix: CodeBaseResponse = new CodeBaseResponse();
    account: AccountResponse = new AccountResponse();
    approveStatus: CodeBaseResponse = new CodeBaseResponse();
    orderStatus: CodeBaseResponse = new CodeBaseResponse();
    repAddress: AddressResponse = new AddressResponse();
    nullableFromDateString: string = '';


}
