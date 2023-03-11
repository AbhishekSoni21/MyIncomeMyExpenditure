import { HighchartModule } from './highchart/highchart.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReusableComponentModule } from './ReusableComponent/reusable-component.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { NetIncomeComponent } from './Page/net-income/net-income.component';
import { EarningCompositionComponent } from './earning-composition/earning-composition.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DummyComponent,
    NetIncomeComponent,
    EarningCompositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReusableComponentModule,
    HighchartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
