import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyResponse } from '../../../core/entity/Company';
import { JWTDecoder } from '../../../core/helpers/jwtdecoder/jwt.decorder';
import { User } from '../../../core/models/auth.models';
import { AuthenticationService } from '../../../core/services/auth.service';
import { MENU } from '../../../layouts/sidebar/menu';
import { MenuItem } from '../../../layouts/sidebar/menu.model';

@Component({
    selector: 'app-company-selection',
    templateUrl: './company-selection.component.html',
    styleUrls: ['./company-selection.component.scss']
})
export class CompanySelectionComponent {


    userName!: string;
    companies!: Observable<CompanyResponse[]>;
    selectedCompany: CompanyResponse = new CompanyResponse();

    constructor(private formBuilder: UntypedFormBuilder, private authenticationService: AuthenticationService, private router: Router,
        private route: ActivatedRoute, private jwtDec: JWTDecoder
    ) {
        // redirect to home if already logged in


        this.userName = jwtDec.getUserDetails();

    }

    ngOnInit(): void {

        this.companies=  this.authenticationService.readCompanies();
    }

  

    onSubmit() {
        this.authenticationService.updateCompany(this.selectedCompany).subscribe((res: any) => {
            localStorage.setItem('access_token', res.token);

            this.router.navigate(['/']);
        });
   

    }

    onSelectionChange(va: any, bs: any) {
        this.selectedCompany = va;

        
    }

}
