import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppIDInterceptor } from './core/helpers/appId.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';

import { HotkeyModule } from 'angular2-hotkeys';
import {  GridModule } from "@syncfusion/ej2-angular-grids";
import { CommonModule } from "@angular/common";

export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}



@NgModule({
    declarations: [
        AppComponent,


    ],
    imports: [
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        LayoutsModule,
        PagesModule,
        NgSelectModule,
        CommonModule,
        GridModule, 
        HotkeyModule.forRoot()
       
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AppIDInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
