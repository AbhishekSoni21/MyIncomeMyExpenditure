import { Component } from '@angular/core';
import { HighchartService } from '../highchart/highchart.service';
import { NETBALANCE } from './mockData';

@Component({
  selector: 'app-monthly-expenditure',
  templateUrl: './monthly-expenditure.component.html',
  styleUrls: ['./monthly-expenditure.component.scss'],
})
export class MonthlyExpenditureComponent {
  constructor(private highChartService: HighchartService) {}
  monthName='';
  currentYear:number=new Date().getFullYear();
  ngOnInit() {
    // this.createGraph();
    this.loadData();
  }

  highchartProperties = {
    properties: {
      chartType: 'donut',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title: 'Monthly Earning Composition',
        subTitle: 'Total Expenditure',
        showTotal: true,
        yAxisTitle: 'Amount in ₹',
        xAxisTitle: 'Months',
        enabledLegends: true,
        formatValue: true,
        dataSeriesValues: {
          enabledDataLabel: false,
        },
      },
    },
  };

  options!: any;

  loadData() {
    // formattedData=[];
    const data = NETBALANCE.map((value: any) => {
      const expenditure = Object.keys(value.expenditure);
      // const deductionKey = Object.keys(value.deduction);
      // const earningKey = Object.keys(value.earning);
      // let earningTotal = 0;
      // let deductionTotal = 0;
      // for (let e in earningKey) {
      //   const tempKey='earning_'+earningKey[e]
      //   value[tempKey]=value['earning'][earningKey[e]]
      //   earningTotal += value['earning'][earningKey[e]];
      // }
      // for (let e in deductionKey) {
      //   const tempKey='deduction_'+deductionKey[e]
      //   value[tempKey]=value['deduction'][deductionKey[e]]
      //   deductionTotal += value['deduction'][deductionKey[e]];
      // }
      // value['deduction_netIncome'] = (earningTotal || 0) - (deductionTotal || 0);
      // value['grossIncome'] = (earningTotal || 0) + (deductionTotal || 0);
      // return value;
      for (let e in expenditure) {
        const tempKey = 'expenditure_' + expenditure[e];
        value[tempKey] = value['expenditure'][expenditure[e]];
        // earningTotal += value['expenditure'][expenditure[e]];
      }
      return value;
    });
    console.log('expenditure data is', data);
    this.createGraph(data);
  }

  createGraph(data: any) {
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

    const monthsList:{key:string,value:string}[] = [
      {key:'Jan',value:'January'},
      {key:'Feb',value:'February'},
      {key:'Mar',value:'March'},
      {key:'Apr',value:'April'},
      {key:'May',value:'May'},
      {key:'Jun',value:'June'},
      {key:'Jul',value:'July'},
      {key:'Aug',value:'August'},
      {key:'Sep',value:'September'},
      {key:'Oct',value:'October'},
      {key:'Nov',value:'Novemeber'},
      {key:'Dec',value:'December'}
    ];

    const sortedData = data.sort((a: any, b: any) => {
      if (a.year != b.year) {
        return a.year - b.year;
      } else {
        return months.indexOf(a.month) - months.indexOf(b.month);
      }
    });
    console.log('sorted data', sortedData);
    const filteredRecord = sortedData.reverse().slice(0, 12).reverse();
    console.log('filteredRecord data', filteredRecord);
    const ignoredSeries = [
      'deduction',
      'earning',
      'grossIncome',
      'year',
      'month',
      'expenditure',
    ];
    const series = Object.keys(filteredRecord[0]).filter(
      (value) => ignoredSeries.indexOf(value) === -1
    );
    console.log('***series', series);

    const defaultProperties = this.highChartService.setHighchartOption(
      this.highchartProperties
    );
    const categories = filteredRecord.map(
      (value: any) =>
        'FY' +
        (+months.indexOf(value?.month) > 2
          ? (value?.year + 1).toString().slice(2)
          : (value?.year).toString().slice(2)) +
        ' ' +
        value?.month
    );
    this.monthName=monthsList.filter(value=>value.key===filteredRecord[0].month).map(mon=>mon.value)[0]
    this.currentYear=filteredRecord[0].year
    this.options = this.highChartService.createGraph(
      [filteredRecord[0]],
      series,
      categories,
      defaultProperties
    );
  }
}
