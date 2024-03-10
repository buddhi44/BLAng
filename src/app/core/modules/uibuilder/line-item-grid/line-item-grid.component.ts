import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'leaflet';
import { OrderItem } from '../../../entity/OrderItem';

import { UIObject } from '../../../entity/UIObject';
import { PropHelper } from '../../../helpers/propertyHelper';
import { BLUIBuilder } from '../../../helpers/ui-builder/IBLUIDefinitons';

@Component({
  selector: 'app-line-item-grid',
  templateUrl: './line-item-grid.component.html',
  styleUrls: ['./line-item-grid.component.scss']
})
export class LineItemGridComponent implements OnInit {

    accessPath: string = 'lineNumber';
    gridDefinition!: UIObject;
    editingLineItem!: OrderItem;

    ngOnInit(): void {
        this.gridDefinition = this.uiObject.children[0];
        if (this.gridDefinition.defaultAccessPath) {
            if (typeof this.def.DataObject[this.gridDefinition.defaultAccessPath] == 'object') {
                this.lineItems = this.def.DataObject[this.gridDefinition.defaultAccessPath] as OrderItem[];
            }
        }
    }

    @Input() uiObject!: UIObject;
    @Input() def!: BLUIBuilder;

    lineItems!: OrderItem[];



    getProperty(lineItem: OrderItem, column: UIObject) {

        let val = PropHelper.getPropertyValue(lineItem, column.mapName);
        
        if (val) {
            if (typeof val == 'number') {
                return formatNumber(val,'en-it');
            }
            return val;
        }
        return '0';
    }


    getFunctionResult(lineItem: OrderItem, column: UIObject) {
        return PropHelper.executeTemplateFunction(lineItem, column);
    }




    onAddNewItemClick(ev: MouseEvent) {


        if (this.def != undefined && this.gridDefinition.onClickAction != null && this.gridDefinition.onClickAction.length > 1) {

            if (this.def.OwnerComponent != undefined && (typeof this.def.OwnerComponent[this.gridDefinition.onClickAction]) == 'function') {
                let callback = this.def.OwnerComponent[this.gridDefinition.onClickAction] as Function
                callback.apply(this.def.OwnerComponent, [ev.target,ev]);
            }
            else {
                console.timeStamp();
                console.error(`cannot find function  ${this.gridDefinition.onClickAction} in the  below mentioned component `);
                console.error(this.def.OwnerComponent);

            }
        }
    
    }

    selectForEdit(lineItem: OrderItem) {
        this.def.DataObject[this.gridDefinition.collectionName] = lineItem;
    }

   


}
