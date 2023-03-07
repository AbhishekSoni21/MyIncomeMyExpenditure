import { HighchartService } from './../../highchart/highchart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private highChartService: HighchartService) {}

  ngOnInit() {
    this.createGraph();
  }

  highchartProperties = {
    properties: {
      chartType: 'column',
      category: '',
      series: [],
    },
    options: {
      chartProperties: {
        title: 'Test Chart',
        subTitle: '',
        showTotal: false,
        yAxisTitle: 'rainfall in mm',
        xAxisTitle: 'test',
        enabledLegends: true,
        dataSeriesValues: {
          enabledDataLabel: true,
        },
      },
    },
  };

  options!: any;
  series = [
    {
      name: 'Tokyo',
      data: [
        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4,
      ],
    },
    {
      name: 'New York',
      data: [
        83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6,
        92.3,
      ],
    },
    {
      name: 'London',
      data: [
        48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2,
      ],
    },
    {
      name: 'Berlin',
      data: [
        42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1,
      ],
    },
  ];
  rowData = [
    { city: 'Tokyo', month: 'Jan', rainfall: 49.9 },
    { city: 'Tokyo', month: 'Feb', rainfall: 71.5 },
    { city: 'Tokyo', month: 'Mar', rainfall: 106.4 },
    { city: 'Tokyo', month: 'Apr', rainfall: 129.2 },
    { city: 'Tokyo', month: 'May', rainfall: 144.0 },
    { city: 'Tokyo', month: 'Jun', rainfall: 176.0 },
    { city: 'Tokyo', month: 'Jul', rainfall: 135.6 },
    { city: 'Tokyo', month: 'Aug', rainfall: 148.5 },
    { city: 'Tokyo', month: 'Sep', rainfall: 216.4 },
    { city: 'Tokyo', month: 'Oct', rainfall: 194.1 },
    { city: 'Tokyo', month: 'Nov', rainfall: 95.6 },
    { city: 'Tokyo', month: 'Dev', rainfall: 54.4 },

    { city: 'New York', month: 'Jan', rainfall: 83.6 },
    { city: 'New York', month: 'Feb', rainfall: 78.8 },
    { city: 'New York', month: 'Mar', rainfall: 98.5 },
    { city: 'New York', month: 'Apr', rainfall: 93.4 },
    { city: 'New York', month: 'May', rainfall: 106.0 },
    { city: 'New York', month: 'Jun', rainfall: 84.5 },
    { city: 'New York', month: 'Jul', rainfall: 105.0 },
    { city: 'New York', month: 'Aug', rainfall: 104.3 },
    { city: 'New York', month: 'Sep', rainfall: 91.2 },
    { city: 'New York', month: 'Oct', rainfall: 83.5 },
    { city: 'New York', month: 'Nov', rainfall: 106.6 },
    { city: 'New York', month: 'Dev', rainfall: 92.3 },

    { city: 'London', month: 'Jan', rainfall: 48.9 },
    { city: 'London', month: 'Feb', rainfall: 38.8 },
    { city: 'London', month: 'Mar', rainfall: 39.3 },
    { city: 'London', month: 'Apr', rainfall: 41.4 },
    { city: 'London', month: 'May', rainfall: 47.0 },
    { city: 'London', month: 'Jun', rainfall: 48.3 },
    { city: 'London', month: 'Jul', rainfall: 59.0 },
    { city: 'London', month: 'Aug', rainfall: 59.6 },
    { city: 'London', month: 'Sep', rainfall: 52.4 },
    { city: 'London', month: 'Oct', rainfall: 65.2 },
    { city: 'London', month: 'Nov', rainfall: 59.3 },
    { city: 'London', month: 'Dev', rainfall: 51.2 },

    { city: 'Berlin', month: 'Jan', rainfall: 42.4 },
    { city: 'Berlin', month: 'Feb', rainfall: 33.2 },
    { city: 'Berlin', month: 'Mar', rainfall: 34.5 },
    { city: 'Berlin', month: 'Apr', rainfall: 39.7 },
    { city: 'Berlin', month: 'May', rainfall: 52.6 },
    { city: 'Berlin', month: 'Jun', rainfall: 75.5 },
    { city: 'Berlin', month: 'Jul', rainfall: 57.4 },
    { city: 'Berlin', month: 'Aug', rainfall: 60.4 },
    { city: 'Berlin', month: 'Sep', rainfall: 47.6 },
    { city: 'Berlin', month: 'Oct', rainfall: 39.1 },
    { city: 'Berlin', month: 'Nov', rainfall: 46.8 },
    { city: 'Berlin', month: 'Dev', rainfall: 51.1 },
  ];
  // , 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
  // 194.1, 95.6, 54.4
  createGraph() {
    const series = ['Tokyo', 'New York', 'Berlin', 'London'];
    const defaultProperties= this.highChartService.setHighchartOption(this.highchartProperties)
    this.options = this.highChartService.createGraph(
      this.rowData,
      series,
      defaultProperties
    );
  }
}
