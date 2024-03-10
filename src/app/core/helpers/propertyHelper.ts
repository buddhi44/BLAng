import { AddressResponse } from "../entity/Base/addressResponse";
import { BaseComboResponse } from "../entity/Base/baseComboResponse";
import { CodeBaseResponse } from "../entity/Base/codeBaseReponse";
import { ComboRequest } from "../entity/Base/comboRequest";
import { ItemResponse } from "../entity/Base/itemResponse";
import { UnitResponse } from "../entity/Base/unitResponse";
import { UIObject } from "../entity/UIObject";
import { BLUIBuilder } from "./ui-builder/IBLUIDefinitons";


export class PropHelper {
    static getPropertyValue(dataItem: any, accessPath: string) {

        let mappedItem: any;

        if (accessPath) {
            let arr = accessPath.split('.');

            // need to write a recursion
            if (arr.length === 1) {
                mappedItem = dataItem[accessPath];
            }
            if (arr.length === 2) {
                let lvl1 = dataItem[arr[0]];
                mappedItem = lvl1[arr[1]];
            }

        }
        return mappedItem;
    }


    static getItemReponseByAccessPath(dataItem: any, accessPath: string): ItemResponse {
        let mappedItem!: ItemResponse;
        if (accessPath) {

            let arr = accessPath.split('.');

            // need to write a recursion
            if (arr.length === 1) {
                mappedItem = dataItem[accessPath] as ItemResponse;
            }
            if (arr.length === 2) {
                let lvl1 = dataItem[arr[0]];
                mappedItem = lvl1[arr[1]] as ItemResponse;
            }
        }
        return mappedItem;
    }

    static getUnitResponseByAccessPath(dataItem: any, accessPath: string): UnitResponse {
        let mappedItem!: UnitResponse;
        if (accessPath) {

            let arr = accessPath.split('.');

            // need to write a recursion
            if (arr.length === 1) {
                mappedItem = dataItem[accessPath] as UnitResponse;
            }
            if (arr.length === 2) {
                let lvl1 = dataItem[arr[0]];
                mappedItem = lvl1[arr[1]] as UnitResponse;
            }
        }
        return mappedItem;
    }


    static updatePropertyPath(vaueToUpdate:any,accessPath:string,rootObject:any) {
        if (accessPath) {

            let arr = accessPath.split('.');

            // need to write a recursion
            if (arr.length === 1) {
                rootObject[accessPath] = vaueToUpdate;
            }
            if (arr.length === 2) {
                let lvl1 = rootObject[arr[0]];
                lvl1[arr[1]] = vaueToUpdate;
            }
        }
    }


    static fireComboChnageEvent(def: BLUIBuilder, uiObject: UIObject, ev: any) {
        if (def != undefined && uiObject.onClickAction != null && uiObject.onClickAction.length > 1) {

            if (def.OwnerComponent != undefined && (typeof def.OwnerComponent[uiObject.onClickAction]) == 'function') {
                let callback = def.OwnerComponent[uiObject.onClickAction] as Function
                callback.apply(def.OwnerComponent, [ev]);
            }
            else {
                console.timeStamp();
                console.error(`cannot find function  ${uiObject.onClickAction} in the  below mentioned component `);
                console.error(def.OwnerComponent);

            }
        }
    }

    static fireOnBeforeChangeComboEvent(def: BLUIBuilder, uiObject: UIObject,request:ComboRequest) {
        if (def != undefined && uiObject.onBeforeComboLoad != null && uiObject.onBeforeComboLoad.length > 1) {

            if (def.OwnerComponent != undefined && (typeof def.OwnerComponent[uiObject.onBeforeComboLoad]) == 'function') {
                let callback = def.OwnerComponent[uiObject.onBeforeComboLoad] as Function
                callback.apply(def.OwnerComponent, [request]);
            }
            else {
                console.timeStamp();
                console.error(`cannot find function  ${uiObject.onBeforeComboLoad} in the  below mentioned component `);
                console.error(def.OwnerComponent);

            }
        }
    }

    static executeTemplateFunction(dataItem:any, uiObject: UIObject) {
        if (dataItem != undefined && (typeof dataItem[uiObject.defaultAccessPath]) == 'function') {

            let callback = dataItem[uiObject.defaultAccessPath] as Function;
            let ret = callback.apply(dataItem);
            return ret;

        }
    }


    static isValidComboSelection(dataItem: BaseComboResponse): boolean {
        if (dataItem === undefined || dataItem === null) {
            return false;
        }

        if (dataItem.comboType) {

            if (dataItem.comboType === 'address-combo') {
                return (dataItem as AddressResponse).addressKey > 10;
            }
            if (dataItem.comboType === 'unit-combo') {
                return (dataItem as UnitResponse).unitKey > 10;
            }
            if (dataItem.comboType === 'item-combo') {
                return (dataItem as ItemResponse).itemKey > 10;
            }
            if (dataItem.comboType === 'codeBase-combo') {
                return (dataItem as CodeBaseResponse).codeKey> 10;
            }
        }

        return false;
    }
}