import { Component, Input, OnInit } from '@angular/core';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {


    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    ngOnInit(): void {
       
    }
    selectedDate: Date = new Date();
    format: string = "d.m.y"


    onDateChanged(ev: Event) {

        this.selectedDate = new Date((ev.target as HTMLInputElement).value);
     
        this.def.DataObject[this.uiObject.defaultAccessPath] = this.selectedDate;
    }


    getVarPath(): string {
        return "selectedDate";
    }
}
