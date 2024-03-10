import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ValidationRule } from "../../entity/contracts/IHeaderCalculation";
import { UIObject } from "../../entity/UIObject";

export class BLUIBuilder {

    OwnerComponent!: any;
    DataObject!: any;
    UIObjectKey: number = 1;
    ObjectRefs: Array<IUIDefinition> = new Array<IUIDefinition>();
    ValidationRules: Array<ValidationRule> = [];
    errorMessage!: ErrorMessage 

    hasComponent(uiDef: IUIDefinition): boolean {

        if (this.ObjectRefs === undefined || this.ObjectRefs.length === 0) {
            return false;

        }
        if (uiDef) {
            return this.ObjectRefs.includes(uiDef);
        }


        return false;
    }


    getComponentByInternalName(name: string): IUIDefinition | undefined {
        if (name) {
            let component = this.ObjectRefs.find((item) => item.uiObject._internalElementName === name);
            return component;
        }
        return undefined;
    }




}

export interface IUIDefinition {

    Disable(): void;
    Enable(): void;
    Reload(): void;
    uiObject: UIObject;


}

export class BaseComponent {
    mainFormDefinitions!: BLUIBuilder;
    UIObjectKey: number = 1;
    errorMessage: ErrorMessage = new ErrorMessage();
  
    constructor(activatedRoute: ActivatedRoute) {
        this.mainFormDefinitions = new BLUIBuilder();
        this.mainFormDefinitions.errorMessage=this.errorMessage;
        activatedRoute.queryParams.subscribe((params: any) => {
            this.UIObjectKey = params.ObjKy as number;
        });
    }
}

export class ErrorMessage {

    errorMessages: Array<string> = [];
    headerTitle: string='';
    isShown: boolean = false;
    successMessage: string = '';
}