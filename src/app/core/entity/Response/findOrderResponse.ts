import { AccountResponse } from "../Base/accountResponse"
import { CodeBaseResponse } from "../Base/codeBaseReponse"

export interface FindOrderResponse {
    orderKey: number;
    orderDate: string;
    insertDate: string;
    prefix: string;
    orderNumber: string;
    documentNumber: string;
    yourReference: string;
    description: string;
    cusSupId: string;
    cusSupName: string;
    projectKey: number;
    projectName: any;
    approveState: CodeBaseResponse;
    account: AccountResponse;
    requestingObjectKey: number;
    previewURL: any;
    entUsrKy: number;
    isActive: number;
    remark: string;
    approveReason: any;
    orderCategory1: CodeBaseResponse;
    orderCategory2: CodeBaseResponse;
    orderStatus: CodeBaseResponse;
   
}