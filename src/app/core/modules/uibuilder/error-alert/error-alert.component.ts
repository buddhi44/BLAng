import { Component, Input } from '@angular/core';
import { BLUIBuilder, ErrorMessage } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent {
    isShown: boolean = true;
    @Input() def!: BLUIBuilder;


}
