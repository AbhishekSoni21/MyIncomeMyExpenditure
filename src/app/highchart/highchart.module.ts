import { HighchartsChartModule } from 'highcharts-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartComponent } from './highchart/highchart.component';



@NgModule({
  declarations: [
    HighchartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
  ],
  exports:[
    HighchartComponent
  ]
})
export class HighchartModule { }
