import { AppServiceService } from './../app-service.service';
import { Component } from '@angular/core';
import { HighchartService } from '../highchart/highchart.service';
import { NETBALANCE } from '../../app/highchart/mockData';


@Component({
  selector: 'app-earning-composition',
  templateUrl: './earning-composition.component.html',
  styleUrls: ['./earning-composition.component.scss']
})
export class EarningCompositionComponent {
  selectedYear=''
  constructor(private highChartService:HighchartService,private appService:AppServiceService){

  }
  ngOnInit() {
    this.selectedYear=this.appService.selectedYear.value.toString()
    // this.createGraph();
    this.loadData();
    this.appService.selectedYear.subscribe((value: any) => {
      this.selectedYear=this.appService.selectedYear.value.toString()
      this.loadData();
    });
    this.appService.selectedMonth.subscribe((value: any) => {
      this.loadData();
      
    });
    console.log("*****************************",this.appService.selectedYear.value);
    
  }

  highchartProperties = {
    properties: {
      chartType: 'stackedGroupColumnBar',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title:' - Monthly Earning Composition',
        subTitle: '',
        showTotal: false,
        yAxisTitle: 'Amount in ₹',
        xAxisTitle: 'Months',
        enabledLegends: true,
        formatValue:true,
        dataSeriesValues: {
          enabledDataLabel: false,
        },
      },
    },
  };

  options!: any;

  loadData() {
    // formattedData=[]; 
    const widgetData=JSON.parse(JSON.stringify(NETBALANCE))
    const data = widgetData.map((value: any) => {
      const deductionKey = Object.keys(value.deduction);
      const earningKey = Object.keys(value.earning);
      let earningTotal = 0;
      let deductionTotal = 0;
      for (let e in earningKey) {
        const tempKey='earning_'+earningKey[e]
        value[tempKey]=value['earning'][earningKey[e]]
        earningTotal += value['earning'][earningKey[e]];
      }
      for (let e in deductionKey) {
        const tempKey='deduction_'+deductionKey[e]
        value[tempKey]=value['deduction'][deductionKey[e]]
        deductionTotal += value['deduction'][deductionKey[e]];
      }
      value['deduction_netIncome'] = (earningTotal || 0) - (deductionTotal || 0);
      value['grossIncome'] = (earningTotal || 0) + (deductionTotal || 0);
      return value;
    });
    console.log('earning composition data is', data);
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
    const filteredRecord = sortedData.filter(
      (value:any) => value.year === this.appService.selectedYear.value
    );;
    console.log("filteredRecord data",filteredRecord)
    const ignoredSeries=['deduction','earning','grossIncome','year','month']
    const series = Object.keys(filteredRecord[0]).filter(value=>ignoredSeries.indexOf(value)===-1)
    console.log("***series",series);

    const defaultProperties = this.highChartService.setHighchartOption(
      this.highchartProperties,this.selectedYear
    );
    const categories= filteredRecord.map((value:any)=>'FY'+ ((+months.indexOf(value?.month))>2?(value?.year+1).toString().slice(2):(value?.year).toString().slice(2))+' ' +value?.month)
    this.options = this.highChartService.createGraph(
      filteredRecord,
      series,
      categories,
      defaultProperties
    );
  }
}
