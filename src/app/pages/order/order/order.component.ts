import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitComboRequest } from '../../../core/entity/Base/comboRequest';
import { BLOrder } from '../../../core/entity/BLOrder';
import { RateAndStockReadRequest } from '../../../core/entity/Request/rateRetrivalRequet';
import { BaseComponent, BLUIBuilder, ErrorMessage } from '../../../core/helpers/ui-builder/IBLUIDefinitons';
import { ItemService } from '../../../core/services/item.service';
import { IOrderValidation, OrderValidation } from 'src/app/core/entity/contracts/IHeaderCalculation';
import { OrderService } from '../../../core/services/order.service';
import { UnitResponse } from '../../../core/entity/Base/unitResponse';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { UIObject } from '../../../core/entity/UIObject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FindOrderRequest } from '../../../core/entity/Request/findOrderRequest';
import { FindOrderResponse } from '../../../core/entity/Response/findOrderResponse';
import { formatDate } from '@angular/common';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent implements OnInit {

    breadCrumbItems!: Array<{}>;
    Order!: BLOrder;
    validationSequence!: IOrderValidation;
    popUpDefinition!: BLUIBuilder;
    @ViewChild('GenericPopUp', { static: true }) elem!: ElementRef;
    findOrderCaption: string = '';
    findOrderRequest!: FindOrderRequest;
    findOrderResponse!: FindOrderResponse[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private itemService: ItemService,
        private orderService: OrderService,
        private _hotkeysService: HotkeysService,
        private modalService: NgbModal
    ) {
        super(activatedRoute);
        this._hotkeysService.add(new Hotkey('ctrl+q', (event: KeyboardEvent): boolean => {
            this.OnLineItemGridAddClick();
            event.preventDefault();
            return false; // Prevent bubbling
        }));

    }

    ngOnInit(): void {

        this.Order = new BLOrder();
        this.Order.objectKey = this.UIObjectKey;
        console.log(this.UIObjectKey);
        this.mainFormDefinitions.UIObjectKey = this.UIObjectKey;
        this.mainFormDefinitions.OwnerComponent = this;
        this.Order.orderDate = new Date();
        this.mainFormDefinitions.DataObject = this.Order;
        this.validationSequence = new OrderValidation(this.mainFormDefinitions.ValidationRules, this.Order, this.mainFormDefinitions.errorMessage);
        this.popUpDefinition = new BLUIBuilder();
        this.findOrderRequest = new FindOrderRequest();
        this.popUpDefinition.DataObject = this.findOrderRequest;
    }


    OnLineItemGridAddClick() {

        if (this.validationSequence.canAddNewItemToGrid()) {
            if (this.Order.currentItem) {
                this.Order.lineItems.push(this.Order.currentItem);
                this.Order.currentItem = undefined;
                this.Order.calculateBalances();

            }
            else {
                this.Order.createNewOrderItem();
            }


        }
        else {
            this.errorMessage.isShown = true;
        }

    }

    OnGridItemComboChanged(target: HTMLElement) {

        if (this.Order.currentItem) {
            this.Order.currentItem.transactionUnit = new UnitResponse();
            let rateAndStockRequest = new RateAndStockReadRequest();
            rateAndStockRequest.objectKey = this.UIObjectKey;
            rateAndStockRequest.addressKey = this.Order.orderAddress.addressKey;
            rateAndStockRequest.locationKey = this.Order.location.codeKey;
            rateAndStockRequest.itemKey = this.Order.currentItem.orderItem.itemKey;
            rateAndStockRequest.payementTermKey = this.Order.orderPaymentTerm.codeKey;
            rateAndStockRequest.effectiveDate = this.Order.orderDate;
            rateAndStockRequest.conditionCode = 'OrdTyp';

            let observer = this.itemService.retriveItemStockAndRate(rateAndStockRequest);
            observer.subscribe((result) => {
                if (this.Order.currentItem) {
                    this.Order.currentItem.transactionRate = result.rateResponse.transactionRate;
                    this.Order.currentItem.rate = result.rateResponse.rate;
                    this.errorMessage.successMessage = `Item ${this.Order.currentItem.orderItem.itemName} has ${result.stockResponse.stockAsAt} Quantity`;
                }
            });
        


            let comp = this.mainFormDefinitions.getComponentByInternalName("Unit");
            if (comp) {
                comp.Reload();
            }
        }


    }

    Unit_OnBeforeDataFetch(request: UnitComboRequest) {
        if (this.Order.currentItem) {
            request.itemKey = this.Order.currentItem.orderItem.itemKey;
        }

    }

    onSaveButtonClicked(elem: any) {

        if (this.validationSequence.canSaveTransaction()) {

            this.orderService.orderService(this.Order).subscribe((ret) => {
                console.log(ret);
            });
        }
        else {
            this.errorMessage.isShown = true;
        }
    }

    onOpenOrderClick(elem: HTMLButtonElement, callerUiObject: UIObject) {
        this.popUpDefinition.errorMessage = new ErrorMessage();
        this.popUpDefinition.UIObjectKey = callerUiObject.referenceElementKey;
        this.findOrderCaption = callerUiObject.elementCaption;
        this.popUpDefinition.OwnerComponent = this;
        this.modalService.open(this.elem, { size: 'fullscreen', windowClass: 'modal-holder' });

    }

    OnFindOrdersClick(elem: HTMLButtonElement, callerUiObject: UIObject) {
        this.findOrderRequest.objectKey = this.UIObjectKey;
        this.findOrderRequest.nullableFromDateString = formatDate(this.findOrderRequest.fromDate, 'dd/MM/yyyy','en-us');
        this.orderService.findOrder(this.findOrderRequest).subscribe((resp) => {


            this.findOrderResponse = resp;
           
        });

    }


}
