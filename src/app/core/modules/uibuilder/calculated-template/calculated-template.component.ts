import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { UIObject } from '../../../entity/UIObject';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-calculated-template',
  templateUrl: './calculated-template.component.html',
  styleUrls: ['./calculated-template.component.scss']
})
export class CalculatedTemplateComponent implements OnInit {


    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    calculatedValue: string = '';
    ngOnInit(): void {
       
    }

    getCalculatedTemplate() {
        return;
    }




}
