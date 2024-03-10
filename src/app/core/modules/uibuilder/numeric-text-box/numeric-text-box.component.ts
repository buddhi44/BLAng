import { Component, Input } from '@angular/core';
import { UIObject } from '../../../entity/UIObject';
import { PropHelper } from '../../../helpers/propertyHelper';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-numeric-text-box',
  templateUrl: './numeric-text-box.component.html',
  styleUrls: ['./numeric-text-box.component.scss']
})
export class NumericTextBoxComponent {
    textBoxValue: string = '';
    ngOnInit(): void {
        if (this.def != undefined && this.def.DataObject != undefined) {

            if (this.def.DataObject[this.uiObject.defaultAccessPath]) {
                this.textBoxValue = this.def.DataObject[this.uiObject.defaultAccessPath];
            }
        }

        if (this.isReadOnly) {
            console.log("Init of ReadOnly")
        }
    }




    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    readOnlyTag: string = '';


    get isReadOnly(): boolean {
        return this.uiObject.elementType === 'ReadOnlyTextBox'
    }

    onTextBoxChange(ev: Event) {


        PropHelper.updatePropertyPath((ev.target as HTMLInputElement).value, this.uiObject.defaultAccessPath, this.def.DataObject);
        if (this.def != undefined && this.uiObject.onClickAction != null && this.uiObject.onClickAction.length > 1) {

            if (this.def.OwnerComponent != undefined && (typeof this.def.OwnerComponent[this.uiObject.onClickAction]) == 'function') {
                let callback = this.def.OwnerComponent[this.uiObject.onClickAction] as Function
                callback.apply(this.def.OwnerComponent, [ev.target]);
            }
            else {
                console.timeStamp();
                console.error(`cannot find function  ${this.uiObject.onClickAction} in the  below mentioned component `);
                console.error(this.def.OwnerComponent);

            }
        }
    }




    ngAfterContentChecked() {
        let val = PropHelper.getPropertyValue(this.def.DataObject, this.uiObject.defaultAccessPath)
        if (val != undefined) {
            this.textBoxValue = val;
            return;
        }
        this.textBoxValue = '0';
    }

}
