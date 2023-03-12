import { Component } from '@angular/core';
import { HighchartService } from '../highchart/highchart.service';
import { NETBALANCE } from '../../app/highchart/mockData';
import { MONTHS, MONTHSLIST } from '../highchart/helperData';

@Component({
  selector: 'app-monthly-expenditure',
  templateUrl: './monthly-expenditure.component.html',
  styleUrls: ['./monthly-expenditure.component.scss'],
})
export class MonthlyExpenditureComponent {
  constructor(private highChartService: HighchartService) {}
  monthName = '';
  currentYear: number = new Date().getFullYear();
  selectedValue: { key: string; value: string } = {} as {
    key: string;
    value: string;
  };
  yearData: any[] = [];
  allData: any[] = [];
  ngOnInit() {
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
    const widgetData = JSON.parse(JSON.stringify(NETBALANCE));
    const data = widgetData.map((value: any) => {
      const expenditure = Object.keys(value.expenditure);
      for (let e in expenditure) {
        const tempKey = 'expenditure_' + expenditure[e];
        value[tempKey] = value['expenditure'][expenditure[e]];
      }
      return value;
    });
    this.extractData(data);
  }

  extractData(data: any) {
    const sortedData = data.sort((a: any, b: any) => {
      if (a.year != b.year) {
        return a.year - b.year;
      } else {
        return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
      }
    });
    const filteredRecord = sortedData;
    this.allData=filteredRecord;
    const tempOption: {}[] = [];
    filteredRecord.map((val: any) =>
      tempOption.push({
        key: val.year + '-' + val.month,
        value: val.year + '-' + val.month,
      })
    );
    this.yearData = [...tempOption.reverse()];
    this.selectedValue = this.yearData?.[0];

    const [year, month] = this.selectedValue?.['key']?.split('-');
    const selectedYearData = filteredRecord.filter(
      (value: any) => value.year === +year && value.month === month
    );
    this.createGraph(selectedYearData);
  }

  handleFilterChange(e:any,data: any) {
    if(e?.isUserInput&& e?.source?.value){
      this.selectedValue=data
    
    const [year, month] = this.selectedValue?.['key']?.split('-');
    const selectedYearData = this.allData.filter(
      (value) => value.year === +year && value.month === month
    );
    this.createGraph(selectedYearData);
    }
  }

  createGraph(filteredRecord: any) {
    const ignoredSeries = [
      'deduction',
      'earning',
      'grossIncome',
      'year',
      'month',
      'expenditure',
      'basic',
    ];
    const series = Object.keys(filteredRecord[0]).filter(
      (value) => ignoredSeries.indexOf(value) === -1
    );

    const defaultProperties = this.highChartService.setHighchartOption(
      this.highchartProperties
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
    this.monthName = MONTHSLIST.filter(
      (value) => value.key === filteredRecord[0].month
    ).map((mon) => mon.value)[0];
    this.currentYear = filteredRecord[0].year;
    this.options = this.highChartService.createGraph(
      [filteredRecord[0]],
      series,
      categories,
      defaultProperties
    );
  }
}
