import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressSelectComponent } from './address-select/address-select.component';
import { UiBuilderComponent } from './ui-builder/ui-builder.component';
import { ToolButtonComponent } from './tool-button/tool-button.component';
import { BLUIBuilder } from '../../helpers/ui-builder/IBLUIDefinitons';
import { UIObject } from '../../entity/UIObject';
import { TextBoxComponent } from './text-box/text-box.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CodeBaseSelectComponent } from './codeBase-select/codeBase-select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { LineItemGridComponent } from './line-item-grid/line-item-grid.component';
import { ItemSelectComponent } from './item-select/item-select.component';
import { UnitSelectComponent } from './unit-select/unit-select.component';
import { NumericTextBoxComponent } from './numeric-text-box/numeric-text-box.component';
import { CalculatedTemplateComponent } from './calculated-template/calculated-template.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { CoreUiRendereComponent } from './core-ui-rendere/core-ui-rendere.component';
import { SwitchBoxComponent } from './switch-box/switch-box.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
        AddressSelectComponent,
        CodeBaseSelectComponent,
        ToolButtonComponent,
        UiBuilderComponent,
        TextBoxComponent,
        DatePickerComponent,
        LineItemGridComponent,
        ItemSelectComponent,
        UnitSelectComponent,
        NumericTextBoxComponent,
        CalculatedTemplateComponent,
        ErrorAlertComponent,
        CoreUiRendereComponent,
        SwitchBoxComponent,
        ButtonComponent,
      
        
  ],
  imports: [
      CommonModule,
      NgSelectModule,
      FormsModule,
      FlatpickrModule
      
    ],
    exports: [
        UiBuilderComponent,
        CoreUiRendereComponent
    ]
})
export class UibuilderModule {  



}
