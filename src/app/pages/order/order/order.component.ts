import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute,RouterOutlet } from '@angular/router';
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
import { formatDate,CommonModule } from '@angular/common';
import {GridAllModule , GridModule, PagerModule,PageService, FilterService, SortService, GroupService, GroupSettingsModel, ResizeService, AggregateService, EditService, GridComponent, ExcelExportService, PdfExportService, ColumnChooserService, ColumnMenuService } from '@syncfusion/ej2-angular-grids';
import { Browser,L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('en-US');

L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [PageService],
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
    public pageSettings: Object={ pageCount: 4, pageSizes: true };

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

    public list :Product[]=[
        {
          "productId": "1001",
          "productName": "Smartphone",
          "price": 500,
          "production": "2023-10-15",
          "manufacturer": "ABC Electronics",
          "discount": 10
        },
        {
          "productId": "1002",
          "productName": "Laptop",
          "price": 1000,
          "production": "2023-09-20",
          "manufacturer": "XYZ Computers",
          "discount": 15
        },
        {
          "productId": "1003",
          "productName": "Headphones",
          "price": 50,
          "production": "2023-08-05",
          "manufacturer": "AudioTech",
          "discount": 5
        },
        {
          "productId": "1004",
          "productName": "Smartwatch",
          "price": 150,
          "production": "2023-11-30",
          "manufacturer": "TechGear",
          "discount": 8
        },
        {
          "productId": "1005",
          "productName": "Tablet",
          "price": 300,
          "production": "2023-07-12",
          "manufacturer": "GadgetCo",
          "discount": 12
        },
        {
          "productId": "1006",
          "productName": "Wireless Mouse",
          "price": 20,
          "production": "2023-06-25",
          "manufacturer": "TechStuff",
          "discount": 3
        },
        {
          "productId": "1007",
          "productName": "External Hard Drive",
          "price": 80,
          "production": "2023-04-18",
          "manufacturer": "DataTech",
          "discount": 7
        },
        {
          "productId": "1008",
          "productName": "Bluetooth Speaker",
          "price": 70,
          "production": "2023-03-10",
          "manufacturer": "SoundMaster",
          "discount": 6
        },
        {
          "productId": "1009",
          "productName": "Gaming Console",
          "price": 400,
          "production": "2023-02-02",
          "manufacturer": "GameTech",
          "discount": 20
        },
        {
          "productId": "1010",
          "productName": "Digital Camera",
          "price": 200,
          "production": "2023-01-15",
          "manufacturer": "PhotoTech",
          "discount": 10
        },
        {
          "productId": "1011",
          "productName": "Fitness Tracker",
          "price": 80,
          "production": "2023-05-20",
          "manufacturer": "FitTech",
          "discount": 5
        },
        {
          "productId": "1012",
          "productName": "Wireless Earbuds",
          "price": 100,
          "production": "2023-04-10",
          "manufacturer": "AudioGuru",
          "discount": 10
        },
        {
          "productId": "1013",
          "productName": "Power Bank",
          "price": 30,
          "production": "2023-03-05",
          "manufacturer": "PowerUp",
          "discount": 3
        },
        {
          "productId": "1014",
          "productName": "E-book Reader",
          "price": 120,
          "production": "2023-02-01",
          "manufacturer": "ReadMe",
          "discount": 8
        },
        {
          "productId": "1015",
          "productName": "Wireless Keyboard",
          "price": 40,
          "production": "2023-01-25",
          "manufacturer": "TypeMaster",
          "discount": 4
        },
        {
          "productId": "1016",
          "productName": "Portable Speaker",
          "price": 60,
          "production": "2023-06-15",
          "manufacturer": "SoundWave",
          "discount": 6
        },
        {
          "productId": "1017",
          "productName": "Smart Scale",
          "price": 50,
          "production": "2023-07-20",
          "manufacturer": "HealthTech",
          "discount": 5
        },
        {
          "productId": "1018",
          "productName": "VR Headset",
          "price": 200,
          "production": "2023-08-10",
          "manufacturer": "VirtualTech",
          "discount": 15
        },
        {
          "productId": "1019",
          "productName": "Wireless Charger",
          "price": 25,
          "production": "2023-09-05",
          "manufacturer": "ChargeTech",
          "discount": 2
        },
        {
          "productId": "1020",
          "productName": "Action Camera",
          "price": 150,
          "production": "2023-10-01",
          "manufacturer": "AdventureTech",
          "discount": 10
        },
        {
          "productId": "1021",
          "productName": "Robot Vacuum Cleaner",
          "price": 300,
          "production": "2023-11-15",
          "manufacturer": "CleanTech",
          "discount": 20
        },
        {
          "productId": "1022",
          "productName": "Electric Toothbrush",
          "price": 40,
          "production": "2023-12-10",
          "manufacturer": "DentalTech",
          "discount": 5
        },
        {
          "productId": "1023",
          "productName": "Drone",
          "price": 250,
          "production": "2024-01-20",
          "manufacturer": "SkyTech",
          "discount": 12
        },
        {
          "productId": "1024",
          "productName": "Smart Home Hub",
          "price": 120,
          "production": "2024-02-05",
          "manufacturer": "HomeTech",
          "discount": 8
        },
        {
          "productId": "1025",
          "productName": "Bluetooth Earphones",
          "price": 60,
          "production": "2024-03-01",
          "manufacturer": "AudioPro",
          "discount": 6
        },
        {
          "productId": "1026",
          "productName": "Car Dash Cam",
          "price": 80,
          "production": "2024-04-10",
          "manufacturer": "AutoTech",
          "discount": 7
        },
        {
          "productId": "1027",
          "productName": "Smart Thermostat",
          "price": 100,
          "production": "2024-05-15",
          "manufacturer": "EcoTech",
          "discount": 10
        },
        {
          "productId": "1028",
          "productName": "Wireless Security Camera",
          "price": 120,
          "production": "2024-06-20",
          "manufacturer": "SecureTech",
          "discount": 8
        },
        {
          "productId": "1029",
          "productName": "Portable SSD",
          "price": 150,
          "production": "2024-07-01",
          "manufacturer": "DataMaster",
          "discount": 10
        },
        {
          "productId": "1030",
          "productName": "Electric Scooter",
          "price": 300,
          "production": "2024-08-10",
          "manufacturer": "EcoRide",
          "discount": 15
        },
        {
          "productId": "1031",
          "productName": "Smart Mug",
          "price": 25,
          "production": "2024-09-15",
          "manufacturer": "MugTech",
          "discount": 3
        },
        {
          "productId": "1032",
          "productName": "Fitness Smartwatch",
          "price": 150,
          "production": "2024-10-20",
          "manufacturer": "FitGear",
          "discount": 12
        },
        {
          "productId": "1033",
          "productName": "Bluetooth Headset",
          "price": 50,
          "production": "2024-11-05",
          "manufacturer": "AudioPlus",
          "discount": 5
        },
        {
          "productId": "1034",
          "productName": "Smart LED Bulb",
          "price": 20,
          "production": "2024-12-01",
          "manufacturer": "LightTech",
          "discount": 2
        },
        {
          "productId": "1035",
          "productName": "Smart Door Lock",
          "price": 100,
          "production": "2025-01-15",
          "manufacturer": "LockTech",
          "discount": 8
        },
        {
          "productId": "1036",
          "productName": "Wireless Barcode Scanner",
          "price": 80,
          "production": "2025-02-20",
          "manufacturer": "ScanTech",
          "discount": 6
        },
        {
          "productId": "1037",
          "productName": "Digital Drawing Tablet",
          "price": 120,
          "production": "2025-03-05",
          "manufacturer": "ArtTech",
          "discount": 10
        }
      ];

}

export class Product{
    
    productId:string="";
    productName:string="";
    price:number=0;
    production:string="";
    manufacturer:string="";
    discount:number=0;
    
}