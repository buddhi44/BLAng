import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './login/toasts-container.component';

import { AccountRoutingModule } from './account-routing.module';
import { SigninModule } from "./auth/signin/signin.module";

import { LoginComponent } from './login/login.component';
import { CompanySelectionComponent } from './login/company-selection/company-selection.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UibuilderModule } from '../core/modules/uibuilder/uibuilder.module';
import { AddressSelectComponent } from '../core/modules/uibuilder/address-select/address-select.component';

@NgModule({
  declarations: [
    
    LoginComponent,
        ToastsContainer,
        CompanySelectionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
      SigninModule,
      NgSelectModule,

  ]
})
export class AccountModule { }
