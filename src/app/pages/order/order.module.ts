import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UibuilderModule } from '../../core/modules/uibuilder/uibuilder.module';
import { UiBuilderComponent } from '../../core/modules/uibuilder/ui-builder/ui-builder.component';



@NgModule({
  declarations: [
        OrderComponent,
    
  ],
  imports: [
      CommonModule,
      OrderRoutingModule,
      SharedModule,
   
  ]
})
export class OrderModule { }
