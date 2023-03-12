import { AppServiceService } from './../../app-service.service';
import { HighchartService } from './../../highchart/highchart.service';
import { Component } from '@angular/core';
import { NETBALANCE } from '../../../app/highchart/mockData';

@Component({
  selector: 'app-net-income',
  templateUrl: './net-income.component.html',
  styleUrls: ['./net-income.component.scss'],
})
export class NetIncomeComponent {
  selectedYear='';
  constructor(private highChartService:HighchartService,private appService:AppServiceService){

  }
  ngOnInit() {
    // this.createGraph();
    this.selectedYear=this.appService.selectedYear.value.toString()
    this.loadData();
    this.appService.selectedYear.subscribe((value: any) => {
      this.selectedYear=this.appService.selectedYear.value.toString()
      this.loadData();

    });
    this.appService.selectedMonth.subscribe((value: any) => {
      this.loadData();
    });
  }



  highchartProperties = {
    properties: {
      chartType: 'column',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title: ' - Month on Month Earning',
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
    const widgetData=JSON.parse(JSON.stringify(NETBALANCE))
    const data = widgetData.map((value: any) => {
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
    const filteredData=sortedData.filter(
      (value:any) => value.year === this.appService.selectedYear.value
    );
    const filteredRecord = filteredData;
    const series = ['grossIncome','netIncome'];
    const defaultProperties = this.highChartService.setHighchartOption(
      this.highchartProperties,this.selectedYear
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
