import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { GridModule, PagerModule,PageService, FilterService, SortService, GroupService, GroupSettingsModel, ResizeService, AggregateService, EditService, GridComponent, ExcelExportService, PdfExportService, ColumnChooserService, ColumnMenuService } from '@syncfusion/ej2-angular-grids';

import { RouterOutlet } from '@angular/router';
import { Browser,L10n, setCulture } from '@syncfusion/ej2-base';
import { Product } from '../../../core/entity/Product';

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
  selector: 'app-grid-test',
  templateUrl: './test.component.html',
  providers: [PageService],
})
export class TestGrid implements OnInit{
  public grid!: GridComponent;
  title = 'bl-grid';
  public rowMode!: string;
  public pageSettings: Object={ pageCount: 4, pageSizes: true };
  public filterSettings!: Object;
  public isDeskTop!: Boolean;
  public toolbar!: string[];
  public list:Product[]=[];
  public data :Product[]=[
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

  ngOnInit(): void {
    this.list=this.data;
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ColumnChooser', 'ExcelExport', 'PdfExport'];
    this.pageSettings = { pageCount: 5, pageSizes: true };
    //this.rowMode = 'Horizontal';
    //this.isDeskTop = !Browser.isDevice;
  }

 

  
}
