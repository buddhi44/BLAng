import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
/*import { AuthfakeauthenticationService } from '../../core/services/authfake.service';*/
import { first } from 'rxjs/operators';
import { ToastService } from './toast-service';
import { User } from '../../core/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;  error = '';
  returnUrl!: string; 
    year: number = new Date().getFullYear();
    user: User = new User();

  constructor(private formBuilder: UntypedFormBuilder,private authenticationService: AuthenticationService,private router: Router,
  private route: ActivatedRoute,
    public toastservice: ToastService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
      this.loginForm = this.formBuilder.group({
          userName: [this.user.userName, [Validators.required]],
          password: [this.user.password, [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.user.userName = this.f['userName'].value;
        this.user.password = this.f['password'].value;
        this.authenticationService.loginUser(this.user).subscribe((res: any) => {
            localStorage.setItem('access_token', res.token);
            this.router.navigate(['/']);
        });;
  
    //this.submitted = true;     // Login Api
    // this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data:any) => {      
    //  if(data.status == 'success'){
    //    localStorage.setItem('toast', 'true');
    //    localStorage.setItem('currentUser', JSON.stringify(data.data));
    //    localStorage.setItem('token', data.token);
    //    this.router.navigate(['/']);
    //  } else {
    //    this.toastservice.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
    //  }
    //});

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}


