import { Component,Input } from '@angular/core';
import * as Highchart from 'highcharts'
@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.scss']
})
export class HighchartComponent {
  Highcharts = Highchart;
  private _options:any
  private _height='500px'
  // linechart: any = {
  //   series: [
  //     {
  //       data: [1, 2, 3],
  //     },
  //   ],
  //   chart: {
  //     type: 'column',
  //   },
  //   title: {
  //     text: 'linechart',
  //   },
  // };

  @Input()
  set height(value:any){
    this._height=value
  }

  get height(){
    return this._height;
  }

  @Input()
  set options(value:any){
    this._options=value;
  }

  get options(){
    return this._options
  }
}
