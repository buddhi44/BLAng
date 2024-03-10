import { Component, Input } from '@angular/core';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;


    onToolButtonClicked(ev: MouseEvent) {

        if (this.def != undefined && this.uiObject.onClickAction != null && this.uiObject.onClickAction.length > 1) {

            if (this.def.OwnerComponent != undefined && (typeof this.def.OwnerComponent[this.uiObject.onClickAction]) == 'function') {
                let callback = this.def.OwnerComponent[this.uiObject.onClickAction] as Function
                callback.apply(this.def.OwnerComponent, [ev.target, this.uiObject]);
            }
            else {
                console.timeStamp();
                console.error(`cannot find function  ${this.uiObject.onClickAction} in the  below mentioned component `);
                console.error(this.def.OwnerComponent);

            }
        }

    }
}
