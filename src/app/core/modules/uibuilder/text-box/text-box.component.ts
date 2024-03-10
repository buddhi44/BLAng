import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
    selector: 'app-text-box',
    templateUrl: './text-box.component.html',
    styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit, AfterContentChecked {

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


        this.def.DataObject[this.uiObject.defaultAccessPath] = (ev.target as HTMLInputElement).value;
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
        if (this.def.DataObject &&     this.def.DataObject[this.uiObject.defaultAccessPath]) {
            this.textBoxValue = this.def.DataObject[this.uiObject.defaultAccessPath];
        }
      
    }
}
