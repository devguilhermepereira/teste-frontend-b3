import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
import { NgxMaskModule } from "ngx-mask";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from "ng2-currency-mask";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import { BusinessComponent } from './pages/business/business.component';
import { FormsModule } from '@angular/forms';


registerLocaleData(localePt);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BusinessComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    CurrencyMaskModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS], },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
