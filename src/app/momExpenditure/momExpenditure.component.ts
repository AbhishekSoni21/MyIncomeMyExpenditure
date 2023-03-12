import { AppServiceService } from './../app-service.service';
import { MONTHS } from './../highchart/helperData';
import { HighchartService } from './../highchart/highchart.service';
import { Component } from '@angular/core';
import { NETBALANCE } from '../highchart/mockData';

@Component({
  selector: 'app-momExpenditure',
  templateUrl: './momExpenditure.component.html',
  styleUrls: ['./momExpenditure.component.scss'],
})
export class MoMExpenditureComponent {
  selectedYear=''
  constructor(private highChartService: HighchartService,private appService:AppServiceService) {}
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
      chartType: 'stackcolumn',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title:' - Month on Month Expenditure',
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
      for (let e in expenditure) {
        const tempKey = 'expenditure_' + expenditure[e];
        value[tempKey] = value['expenditure'][expenditure[e]];
        // earningTotal += value['expenditure'][expenditure[e]];
      }
      return value;
    });
    // this.createGraph(data);
    this.extractData(data);
  }

  extractData(data:any){
    const sortedData = data.sort((a: any, b: any) => {
      if (a.year != b.year) {
        return a.year - b.year;
      } else {
        return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
      }
    });
    const filteredRecord = sortedData;
    
    const selectedYearData = filteredRecord.filter(
      (value:any) => value.year === this.appService.selectedYear.value
    );
    this.createGraph(selectedYearData);
  }

  createGraph(filteredRecord: any) {
    
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

    const defaultProperties = this.highChartService.setHighchartOption(
      this.highchartProperties,this.selectedYear
    );
    const categories = filteredRecord.map(
      (value: any) =>
        'FY' +
        (+MONTHS.indexOf(value?.month) > 2
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
