import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { OrderModule } from './order/order.module';

@NgModule({
    declarations: [
        DashboardComponent,
        ToastsContainer
    ],
    imports: [
        CommonModule,
        FormsModule,

        FlatpickrModule.forRoot(),
        CountToModule,
        NgApexchartsModule,
        SimplebarAngularModule,
        PagesRoutingModule,
        NgxUsefulSwiperModule,
        DashboardsModule,


    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
    constructor() {
        defineElement(lottie.loadAnimation);
    }
}
