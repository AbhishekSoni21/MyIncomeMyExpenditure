import { HighchartService } from './../../highchart/highchart.service';
import { Component } from '@angular/core';
import { NETBALANCE } from './mockData';

@Component({
  selector: 'app-net-income',
  templateUrl: './net-income.component.html',
  styleUrls: ['./net-income.component.scss'],
})
export class NetIncomeComponent {
  constructor(private highChartService:HighchartService){

  }
  ngOnInit() {
    // this.createGraph();
    this.loadData();
  }

  highchartProperties = {
    properties: {
      chartType: 'column',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title: 'Month on Month Earning',
        subTitle: '',
        showTotal: false,
        yAxisTitle: 'Amount in ₹',
        xAxisTitle: 'Months',
        enabledLegends: true,
        formatValue:true,
        dataSeriesValues: {
          enabledDataLabel: true,
        },
      },
    },
  };

  options!: any;

  loadData() {
    const data = NETBALANCE.map((value: any) => {
      const deductionKey = Object.keys(value.deduction);
      const earningKey = Object.keys(value.earning);
      let earningTotal = 0;
      let deductionTotal = 0;
      for (let e in earningKey) {
        earningTotal += value['earning'][earningKey[e]];
      }
      for (let e in deductionKey) {
        deductionTotal += value['deduction'][deductionKey[e]];
      }
      value['netIncome'] = (earningTotal || 0) - (deductionTotal || 0);
      value['grossIncome'] = (earningTotal || 0) + (deductionTotal || 0);
      return value;
    });
    console.log('data is', data);
    this.createGraph(data);
  }

  createGraph(data:any) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const sortedData=data.sort((a:any,b:any)=>{
      if(a.year!=b.year){
        return a.year-b.year
      }else{
        return months.indexOf(a.month)- months.indexOf(b.month)
      }
    })
    console.log("sorted data",sortedData)
    const filteredRecord = sortedData.reverse().slice(0,12).reverse();
    console.log("filteredRecord data",filteredRecord)
    const series = ['grossIncome','netIncome'];
    const defaultProperties = this.highChartService.setHighchartOption(
      this.highchartProperties
    );
    const categories= filteredRecord.map((value:any)=>'FY'+ ((+months.indexOf(value?.month))>2?(value?.year+1).toString().slice(2):(value?.year).toString().slice(2))+' ' +value?.month)
    this.options = this.highChartService.createGraph(
      filteredRecord,
      series,
      categories,
      defaultProperties,
    );
  }
}
