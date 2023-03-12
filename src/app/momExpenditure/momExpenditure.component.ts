import { HighchartService } from './../highchart/highchart.service';
import { Component } from '@angular/core';
import { NETBALANCE } from '../highchart/mockData';

@Component({
  selector: 'app-momExpenditure',
  templateUrl: './momExpenditure.component.html',
  styleUrls: ['./momExpenditure.component.scss'],
})
export class MoMExpenditureComponent {
  constructor(private highChartService: HighchartService) {}
  ngOnInit() {
    // this.createGraph();
    this.loadData();
  }

  highchartProperties = {
    properties: {
      chartType: 'stackcolumn',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title: 'Month on Month Expenditure',
        subTitle: '',
        showTotal: false,
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
    const widgetData=JSON.parse(JSON.stringify(NETBALANCE))
    const data = widgetData.map((value: any) => {
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
    this.options = this.highChartService.createGraph(
      filteredRecord,
      series,
      categories,
      defaultProperties
    );
  }
}
