import { OneThirdPageLayoutComponent } from './one-third-page-layout/one-third-page-layout.component';
import { HalfPageLayoutComponent } from './half-page-layout/half-page-layout.component';
import { FullPageLayoutComponent } from './full-page-layout/full-page-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FullPageLayoutComponent,
    HalfPageLayoutComponent,
    OneThirdPageLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullPageLayoutComponent,
    HalfPageLayoutComponent,
    OneThirdPageLayoutComponent
  ]
})
export class ReusableComponentModule { }
