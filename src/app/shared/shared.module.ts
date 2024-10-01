import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  declarations: [    
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
