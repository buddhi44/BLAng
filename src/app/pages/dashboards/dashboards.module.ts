import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountToModule } from 'angular-count-to';

import { NgbDropdownModule, NgbNavModule, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';

// Component
import { AnalyticsComponent } from './analytics/analytics.component';
import { CrmComponent } from './crm/crm.component';

import { ProjectsComponent } from './projects/projects.component';

import { JobComponent } from './job/job.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    CrmComponent,

    ProjectsComponent,

    JobComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    CountToModule,
    NgbToastModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    NgxUsefulSwiperModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule
  ],
})
export class DashboardsModule { }
