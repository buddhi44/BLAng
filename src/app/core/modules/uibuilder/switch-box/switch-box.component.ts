import { Component, Input } from '@angular/core';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-switch-box',
  templateUrl: './switch-box.component.html',
  styleUrls: ['./switch-box.component.scss']
})
export class SwitchBoxComponent {
    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;
}
