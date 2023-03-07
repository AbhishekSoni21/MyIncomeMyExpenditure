import { Injectable } from '@angular/core';

const defaultTitleOptions = {
  style: {
    fontWeight: '500',
    fontSize: '28px',
  },
};

const defaultDonutTitleOptions = {
  style: {
    fontWeight: '500',
    fontSize: '20px',
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap !important',
  },
};

const defaultDonutSubTitleOptions = {
  style: {
    fontWeight: '400',
    fontSize: '14px',
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap !important',
  },
};

const defaultSubTitleOptions = {
  style: {
    fontWeight: '400',
    fontSize: '17px',
  },
};

const defaultIpadTitleOptions = {
  style: {
    fontWeight: '500',
    fontSize: '17px',
  },
};

const legendFontSize = {
  fontSize: '14px',
  fontWeight: '400',
};

const dataLabelStyle = {
  fontSize: '12px',
  fontWeight: '400',
};

@Injectable({
  providedIn: 'root',
})
export class HighchartService {
  constructor() {}

  setHighchartOption(data: any) {
    return {
      type: data?.properties?.chartType,
      category: data?.properties?.category || [],
      series: data?.properties?.series || [],
      title: data?.options?.chartProperties?.title,
      subTitle: data?.options?.chartProperties?.subTitle,
      showTotal: data?.options?.chartProperties?.showTotal,
      yAxisTitle: data?.options?.chartProperties?.yAxisTitle,
      xAxisTitle: data?.options?.chartProperties?.xAxisTitle,
      enableLegends: data?.options?.chartProperties?.enabledLegends,
      dataLabels:
        data?.options?.chartProperties?.dataSeriesValues?.enabledDataLabel,
      abbreviateLargeNumber:
        data?.options?.chartProperties?.dataSeriesValues?.abbreviateLargeNumber,
      yMax: data?.options?.chartProperties?.yAxis?.max || undefined,
    };
  }

  createGraph(array: any[], series: any[], options: any) {
    const configuredOption = { ...options };
    const category: any[] = [
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
    switch (configuredOption.type) {
      case 'column':
        return this.getBarChart(
          this.getBarSeriesData(array, series),
          category,
          configuredOption
        );
      default:
        return null;
    }
  }

  getBarSeriesData(array: any[], series: any[]) {
    if (!series) {
      return null;
    }
    const barSeries = series.map((serie) => {
      return {
        name: serie,
        data: array
          .filter((value) => value['city'] === serie)
          .map((value) => value?.rainfall),
      };
    });
    console.log('barseries', barSeries);

    return barSeries;
  }

  getBarChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    console.log('option---', configuredOption);
    console.log('cateogry', category);

    const chart = {
      chart: {
        type: 'column',
        // style:{
        //   fontFamily:''
        // }
      },
      credits: {
        enabled: false,
      },
      // colors:[],
      title: {
        text: configuredOption?.title || null,
        ...defaultTitleOptions,
      },
      subtitle: {
        text: configuredOption?.subTitle || null,
        ...defaultSubTitleOptions,
      },
      legend: {
        enabled: configuredOption?.enableLegends || false,
        itemStyle: { ...legendFontSize },
      },
      xAxis: {
        categories: category || null,
        title: {
          text: configuredOption?.xAxisTitle || null,
        },
        crosshair: true,
        tickWidth: 0,
        labels: {
          style: {
            fontSize: '12px',
          },
        },
        lineColor: '#e7e7e8',
        gridLineColor: '#e7e7e8',
      },
      yAxis: {
        min: 0,
        title: {
          text: configuredOption?.yAxisTitle || null,
        },
        tickWidth: 0,
        labels: {
          style: {
            fontSize: '12px',
          },
        },
        lineColor: '#e7e7e8',
        gridLineColor: '#e7e7e8',
      },
      tooltip: {
        pointFormatter: function (this: any) {
          return (
            '<span style="color:>' +
            this.series.color +
            ';">*</span><span style="fontSize:14px">' +
            this.series.name +
            ':<br>' +
            this.y +
            '</b></span><br/>'
          );
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          borderRadius: 2,
        },
        series: {
          dataLabels: {
            allowOverlap: true,
            crop: false,
            overflow: "none",
            rotation: -90,
            position: "top",
            align: 'left',
            x: -2,
            y: -5,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
            },
            enabled: configuredOption?.dataLabels || false,
          },
        },
      },
      series: series,
    };
    console.log('chart is', chart);

    return chart;
  }
}
