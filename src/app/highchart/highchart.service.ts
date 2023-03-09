import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
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
        return this.getColumnChart(
          this.getColumnSeriesData(array, series),
          category,
          configuredOption
        );
      case 'bar':
        return this.getBarChart(
          this.getBarSeriesData(array, series),
          category,
          configuredOption
        );
      case 'stackedBar':
        return this.getBarChart(
          this.getBarSeriesData(array, series),
          category,
          configuredOption
        );
      case 'groupedBar':
        return this.getBarGroupedChart(
          this.getBarSeriesData(array, series),
          category,
          configuredOption
        );
      case 'line':
        return this.getLineChart(
          this.getLineSeriesData(array, series),
          category,
          configuredOption
        );
      case 'stackedLine':
        return this.getStackedLineChart(
          this.getLineSeriesData(array, series),
          category,
          configuredOption
        );
      case 'donut':
        return this.getDonutChart(
          this.getPieSeriesData(array, series, configuredOption.catrgory, true),
          category,
          configuredOption
        );
      case 'semiDonut':
        return this.getSemiDonutChart(
          this.getPieSeriesData(array, series, configuredOption.catrgory, true),
          category,
          configuredOption
        );
      case 'pie':
        return this.getPieChart(
          this.getPieSeriesData(
            array,
            series,
            configuredOption.catrgory,
            false
          ),
          category,
          configuredOption
        );
      case 'stackedGroupColumnBar':
        return this.getBarGroupedChart(
          this.getStackGroupBarSeriesData(array, series),
          category,
          configuredOption
        );
      default:
        return this.getBarChart(
          this.getBarSeriesData(array, series),
          category,
          configuredOption
        );
    }
  }

  getColumnSeriesData(array: any[], series: any[]) {
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

  getStackGroupBarSeriesData(array: any[], series: any[]) {
    if (!series) {
      return null;
    }
    const stackSeries = series.map((serie: any) => {
      if (serie.id) {
        return {
          name: serie,
          data: array,
          stack: serie.stack,
          showInLegend: serie.showInLegend,
          id: serie.id,
        };
      } else if (serie.linkedTo) {
        return {
          name: serie,
          data: array,
          stack: serie.stack,
          showInLegend: serie.showInLegend,
          linkedTo: serie.linkedTo,
        };
      } else {
        return {
          name: serie,
          data: array,
          stack: serie.stack,
        };
      }
    });
    return stackSeries;
  }

  getLineSeriesData(array: any[], series: any[]) {
    if (!series) {
      return null;
    }
    const lineSeries = series.map((serie) => {
      return {
        name: serie,
        data: array,
      };
    });
    return lineSeries;
  }

  getPieSeriesData(
    array: any[],
    series: any[],
    category: string,
    isDonut: boolean
  ) {
    if (!series) {
      return null;
    }
    const pieSeries = [
      {
        type: 'pie',
        name: 'Value',
        innerSize: isDonut ? '90%' : null,
        data: array.map((row) => {
          let total = 0;
          series.map((serie) => {
            total += serie;
          });
          return {
            name: row[category],
            y: total,
          };
        }),
      },
    ];
    return pieSeries;
  }

  getColumnChart(series: any, category: any, options: any) {
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
            overflow: 'none',
            rotation: -90,
            position: 'top',
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

  getBarChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    console.log('option---', configuredOption);
    console.log('cateogry', category);

    const chart = {
      chart: {
        type: 'bar',
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
            overflow: 'none',
            rotation: -90,
            position: 'top',
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

  getBarGroupedChart(series: any, category: any, options: any) {
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
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        backgroundColor: '#FFFFFF',
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
        max: configuredOption?.yMax || undefined,
        title: {
          text: configuredOption?.yAxisTitle || null,
        },
        tickWidth: 0,
        labels: {
          overflow: 'justify',
          style: {
            fontSize: '12px',
          },
        },
        lineColor: '#e7e7e8',
        gridLineColor: '#e7e7e8',
        tickPositioner: configuredOption?.yMax
          ? function (min: any, max: any) {
              const tickPosCor = [];
              const numOfTicks = 5;
              const tick = (max - min) / numOfTicks;
              tickPosCor.push(0);
              for (let i = 0; i < numOfTicks; i++) {
                tickPosCor.push(Highcharts.correctFloat(tickPosCor[i] + tick));
              }
              return tickPosCor;
            }
          : undefined,
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
          stacking: 'normal',
          dataLabels: {
            enabled: configuredOption?.dataLabels || false,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
            },
          },
          // pointPadding: 0.2,
          borderWidth: 0,
          borderRadius: 2,
          shadow: {
            color: '#d8d8d8',
            offsetX: '0',
            offsetY: '2',
          },
        },
        series: {
          // dataLabels: {
          //   allowOverlap: true,
          //   crop: false,
          //   overflow: "none",
          //   rotation: -90,
          //   position: "top",
          //   align: 'left',
          //   x: -2,
          //   y: -5,
          //   formatter: function (this: any) {
          //     return this.y;
          //   },
          //   style: {
          //     ...dataLabelStyle,
          //   },
          //   enabled: configuredOption?.dataLabels || false,
          // },
          tooltip: {
            headerFormat:
              '<span style="font-size:10px"><b>{point.key}</b></span><br/>',
            pointFormat:
              '<span style="color:{point.color}">.</span>{series.name}:{point.y:.0f}<br/>',
          },
        },
      },
      series: series,
    };
    console.log('chart is', chart);

    return chart;
  }

  getLineChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    const chart = {
      chart: {
        type: 'line',
        style: {
          // fontFamily:''
        },
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
        ...defaultTitleOptions,
      },
      legend: {
        enabled: configuredOption?.enabledLegends || false,
        itemStyle: { ...legendFontSize },
      },
      xAxis: {
        categories: category || null,
        title: {
          text: configuredOption?.xAxisTitle || null,
        },
      },
      yAxis: {
        title: {
          text: configuredOption?.yAxisTitle || null,
        },
        gridLineWidth: 1,
      },
      tooltip: {
        pointFormatter: function (this: any) {
          return (
            '<span style="color:' +
            this.series.color +
            ';">.</span><span style="fontSize:14px">' +
            this.series.name +
            ':<br>' +
            this.y +
            '</b></span><br/>'
          );
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: configuredOption?.dataLabels || false,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
            },
          },
        },
      },
      series: series,
    };
    console.log('chart is ', chart);
    return chart;
  }

  getStackedLineChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    const chart = {
      chart: {
        type: 'area',
        style: {
          // fontFamily:''
        },
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
        ...defaultTitleOptions,
      },
      legend: {
        enabled: configuredOption?.enabledLegends || false,
        itemStyle: { ...legendFontSize },
      },
      xAxis: {
        categories: category || null,
        tickmarkPlacement: 'on',
        title: {
          text: configuredOption?.xAxisTitle || null,
        },
      },
      yAxis: {
        title: {
          text: configuredOption?.yAxisTitle || null,
        },
        gridLineWidth: 1,
      },
      tooltip: {
        pointFormatter: function (this: any) {
          return (
            '<span style="color:' +
            this.series.color +
            ';">.</span><span style="fontSize:14px">' +
            this.series.name +
            ':<br>' +
            this.y +
            '</b></span><br/>'
          );
        },
      },
      plotOptions: {
        area: {
          dataLabels: {
            enabled: configuredOption?.dataLabels || false,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
            },
          },
          stacking: 'normal',
          lineColor: '#ffffff',
          lineWidth: 0,
          fillOpacity: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
          },
        },
      },
      series: series,
    };
    console.log('chart is ', chart);
    return chart;
  }

  getDonutChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    const total = this.getTotalForPieSeries(series);
    const { titlePosition, subtitlePosition } = this.getPositionForMobile(
      series?.[0]
    );
    const legendItemWidth = this.getItemWidth(series?.[0]);
    if (series?.[0] && total === 0) {
      series[0].innerSize = '100%';
      series[0].color = '#eee';
    }
    const chart = {
      chart: {
        marginLeft: configuredOption?.enabledLegends ? -300 : undefined,
        style: {
          // fontFamily:''
        },
      },
      credits: {
        enabled: false,
      },
      // colors:[],
      title: {
        text: configuredOption?.showTotal
          ? total
          : configuredOption?.title || null,
        align: 'center',
        verticalAlign: 'middle',
        widthAdjust: -1000,
        y: configuredOption?.subTitle?.length ? 0 : 20,
        x: configuredOption?.enabledLegends
          ? configuredOption?.subTitle?.length
            ? -130
            : -155
          : 0,
        ...defaultDonutTitleOptions,
      },
      subtitle: {
        text: configuredOption?.subTitle || null,
        align: 'center',
        verticalAlign: 'middle',
        widthAdjust: -1000,
        y: configuredOption?.subTitle?.length ? 25 : -20,
        x: configuredOption?.enabledLegends
          ? configuredOption?.subTitle?.length
            ? -130
            : -130
          : 0,
        ...defaultDonutSubTitleOptions,
      },
      legend: {
        enabled: configuredOption?.enabledLegends || false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginBottom: 5,
        itemWidth: 270,
        floating: true,
        width: 230,
        itemStyle: { ...legendFontSize },
        x: configuredOption?.dataLabels
          ? options?.abbreviateLargeNumber
            ? -360
            : -330
          : -450,
      },
      tooltip: {
        pointFormatter: function (this: any) {
          return (
            '<span style="color:' +
            this.series.color +
            ';">.</span>' +
            '<span style="fontSize:14px"><span style="fontWeight:400">' +
            this.series.name +
            '</span>' +
            ':<b>' +
            '&nbsp' +
            '<span style:"fontWeight:900">' +
            this.y +
            '</span></span>' +
            '</b><br/>'
          );
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: configuredOption?.dataLabels || false,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
              fontSize: '14px',
            },
            crop: false,
            overflow: 'allow',
          },
          showInLegend: true,
          size: 210,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1350,
            },
            chartOptions: {
              title: {
                widthAdjust: -800,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? 5
                    : 20
                  : configuredOption?.subTitle?.length
                  ? 10
                  : 20,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -800,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -280
                    : -250
                  : -370,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1250,
            },
            chartOptions: {
              title: {
                widthAdjust: -800,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -800,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -210
                    : -180
                  : -300,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1150,
            },
            chartOptions: {
              title: {
                widthAdjust: -800,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -800,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -190
                    : -160
                  : -280,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1100,
            },
            chartOptions: {
              title: {
                widthAdjust: -700,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -700,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -170
                    : -140
                  : -260,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1050,
            },
            chartOptions: {
              title: {
                widthAdjust: -700,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -700,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -150
                    : -120
                  : -240,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1000,
            },
            chartOptions: {
              title: {
                widthAdjust: -700,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -700,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -120
                    : -90
                  : -210,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 950,
            },
            chartOptions: {
              title: {
                widthAdjust: -580,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -580,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -100
                    : -70
                  : -190,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 900,
            },
            chartOptions: {
              title: {
                widthAdjust: -580,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -580,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -70
                    : -40
                  : -160,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 850,
            },
            chartOptions: {
              title: {
                widthAdjust: -500,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -500,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -50
                    : -20
                  : -140,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 800,
            },
            chartOptions: {
              title: {
                widthAdjust: -500,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -500,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -30
                    : 0
                  : -120,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 750,
            },
            chartOptions: {
              title: {
                widthAdjust: -400,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -400,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -30
                    : -16
                  : -100,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
              plotOptions: {
                pie: {
                  dataLabels: {
                    distance: 15,
                    padding: 2,
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 700,
            },
            chartOptions: {
              title: {
                widthAdjust: -400,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 20,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -400,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 25
                  : -20,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 0,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -80,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 650,
            },
            chartOptions: {
              title: {
                widthAdjust: -350,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -155
                    : -155
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 20,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -350,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -155
                    : -155
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 25
                  : -20,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 8,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -60,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -300
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 600,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 20,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 25
                  : -20,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 0,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -40,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 550,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 20,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 25
                  : -20,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 0,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -20,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -320 : -170,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 20,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -320 : -170,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 25
                  : -20,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 0,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : 0,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 160 : 210,
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 480,
            },
            chartOptions: {
              title: {
                text: configuredOption?.showTotal
                  ? configuredOption?.abbreviateLargeNumber
                    ? total
                    : total
                  : configuredOption?.title || null,
                align: 'center',
                verticalAlign: 'middle',
                widthAdjust: configuredOption?.enabledLegends ? -160 : -120,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,
                y: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? titlePosition
                    : titlePosition + 10
                  : configuredOption?.subTitle?.length
                  ? 10
                  : 20,
                ...defaultDonutTitleOptions,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                text: configuredOption?.subTitle || null,
                align: 'center',
                verticalAlign: 'middle',
                widthAdjust: configuredOption?.enabledLegends ? -160 : -120,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -20
                  : 0,
                y: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? subtitlePosition
                    : subtitlePosition
                  : 25,
                ...defaultDonutSubTitleOptions,
                style: {
                  fontSize: '14px',
                },
              },
              legend: {
                enabled: configuredOption?.enabledLegends || false,
                verticalAlign: 'bottom',
                floating: false,
                layout: 'horizontal',
                align: 'center',
                width: 184,
                itemWidth: legendItemWidth,
                padding: 8,
                itemDistance: 5,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 0 : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 160 : 210,
                  dataLabels: {
                    distance: 15,
                    padding: 2,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 300,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition + 5
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 15
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? titlePosition
                    : titlePosition + 10
                  : configuredOption?.subTitle?.length
                  ? 10
                  : 15,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,

                style: {
                  fontSize: '14px',
                },
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 0 : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 130 : 160,
                  dataLabels: {
                    distance: 5,
                    padding: 1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 250,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition + 5
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 15
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? titlePosition
                    : titlePosition + 10
                  : configuredOption?.subTitle?.length
                  ? 10
                  : 15,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,

                style: {
                  fontSize: '14px',
                },
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 0 : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 110 : 160,
                  dataLabels: {
                    distance: 6,
                    padding: 1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 225,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? 0
                      : 0
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : -5,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition + 5
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 15
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? titlePosition
                    : titlePosition + 10
                  : configuredOption?.subTitle?.length
                  ? 10
                  : 15,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? 0
                      : 0
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : -5,

                style: {
                  fontSize: '14px',
                },
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 10 : 0,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 100 : 160,
                  dataLabels: {
                    distance: 3,
                    padding: 1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 200,
            },
            chartOptions: {
              legend: {
                itemWidth: legendItemWidth ? 90 : undefined,
                width: 180,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 85 : 160,
                  dataLabels: {
                    distance: 1,
                    padding: -1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 170,
            },
            chartOptions: {
              legend: {
                itemWidth: legendItemWidth ? 80 : undefined,
                width: 160,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 60 : 150,
                },
              },
            },
          },
        ],
      },
      series: series,
    };
    console.log('chart is', chart);

    return chart;
  }

  getSemiDonutChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    const total = this.getTotalForPieSeries(series);
    const { titlePosition, subtitlePosition } = this.getPositionForMobile(
      series?.[0]
    );
    const legendItemWidth = this.getItemWidth(series?.[0]);
    if (series?.[0] && total === 0) {
      series[0].innerSize = '100%';
      series[0].color = '#eee';
    }
    const chart = {
      chart: {
        marginLeft: configuredOption?.enabledLegends ? -300 : undefined,
        style: {
          // fontFamily:''
        },
      },
      credits: {
        enabled: false,
      },
      // colors:[],
      title: {
        text: configuredOption?.showTotal
          ? total
          : configuredOption?.title || null,
        align: 'center',
        verticalAlign: 'middle',
        widthAdjust: -1000,
        y: configuredOption?.enabledLegends
          ? configuredOption?.subTitle?.length
            ? -20
            : 0
          : configuredOption?.subTitle?.length
          ? -20
          : 0,
        x: configuredOption?.enabledLegends
          ? configuredOption?.subTitle?.length
            ? -130
            : -155
          : 0,
        ...defaultDonutTitleOptions,
      },
      subtitle: {
        text: configuredOption?.subTitle || null,
        align: 'center',
        verticalAlign: 'middle',
        widthAdjust: -1000,
        y: 0,
        x: configuredOption?.enabledLegends
          ? configuredOption?.subTitle?.length
            ? -130
            : -130
          : 0,
        ...defaultDonutSubTitleOptions,
      },
      legend: {
        enabled: configuredOption?.enabledLegends || false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginBottom: 5,
        itemWidth: 270,
        floating: true,
        width: 230,
        itemStyle: { ...legendFontSize },
        x: -450,
      },
      tooltip: {
        pointFormatter: function (this: any) {
          return (
            '<span style="color:' +
            this.series.color +
            ';">.</span>' +
            '<span style="fontSize:14px"><span style="fontWeight:400">' +
            this.series.name +
            '</span>' +
            ':<b>' +
            '&nbsp' +
            '<span style:"fontWeight:900">' +
            this.y +
            '</span></span>' +
            '</b><br/>'
          );
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: configuredOption?.dataLabels || false,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
              fontSize: '14px',
            },
          },
          startAngle: -90,
          endAngle: 90,
          showInLegend: true,
          size: 210,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1350,
            },
            chartOptions: {
              title: {
                widthAdjust: -800,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -20
                    : 0
                  : configuredOption?.subTitle?.length
                  ? -20
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -800,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -280
                    : -250
                  : -370,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1250,
            },
            chartOptions: {
              title: {
                widthAdjust: -800,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -800,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -210
                    : -180
                  : -300,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1150,
            },
            chartOptions: {
              title: {
                widthAdjust: -800,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -800,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -190
                    : -160
                  : -280,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1100,
            },
            chartOptions: {
              title: {
                widthAdjust: -700,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -700,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -170
                    : -140
                  : -260,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1050,
            },
            chartOptions: {
              title: {
                widthAdjust: -700,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -700,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -150
                    : -120
                  : -240,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 1000,
            },
            chartOptions: {
              title: {
                widthAdjust: -700,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -700,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -120
                    : -90
                  : -210,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 950,
            },
            chartOptions: {
              title: {
                widthAdjust: -580,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -580,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -100
                    : -70
                  : -190,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 900,
            },
            chartOptions: {
              title: {
                widthAdjust: -580,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -580,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -70
                    : -40
                  : -160,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 850,
            },
            chartOptions: {
              title: {
                widthAdjust: -500,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -500,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -50
                    : -20
                  : -140,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 800,
            },
            chartOptions: {
              title: {
                widthAdjust: -500,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -500,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -30
                    : 0
                  : -120,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 750,
            },
            chartOptions: {
              title: {
                widthAdjust: -400,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -400,
              },
              legend: {
                x: configuredOption?.dataLabels
                  ? configuredOption?.abbreviateLargeNumber
                    ? -30
                    : -16
                  : -100,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? -250 : undefined,
              },
              plotOptions: {
                pie: {
                  dataLabels: {
                    distance: 15,
                    padding: 2,
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 700,
            },
            chartOptions: {
              title: {
                widthAdjust: -400,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? -20
                  : 0,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -400,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 0,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 8,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -80,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 650,
            },
            chartOptions: {
              title: {
                widthAdjust: -350,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -155
                    : -155
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? -20
                  : 0,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: -350,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -155
                    : -155
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 0,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 8,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -60,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -300
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 600,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? -20
                  : 0,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 0,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 8,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -40,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 550,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? -20
                  : 0,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -340 : -250,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 0,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 8,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : -20,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
            },
          },
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -320 : -170,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -5
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? titlePosition
                      : titlePosition + 10
                    : configuredOption?.subTitle?.length
                    ? 10
                    : 20
                  : configuredOption?.subTitle?.length
                  ? -20
                  : 0,

                ...defaultDonutTitleOptions,
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -320 : -170,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? -5
                      : -20
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -130
                    : -130
                  : 0,
                y: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? subtitlePosition
                      : subtitlePosition
                    : 25
                  : configuredOption?.subTitle?.length
                  ? 0
                  : 0,
              },
              legend: {
                verticalAlign: configuredOption ? 'bottom' : 'middle',
                floating: configuredOption?.dataLabels ? false : true,
                layout: configuredOption?.dataLabels
                  ? 'horizontal'
                  : 'vertical',
                align: configuredOption?.dataLabels ? 'center' : 'right',
                width: configuredOption?.dataLabels ? 184 : 230,
                itemWidth: configuredOption?.dataLabels ? legendItemWidth : 270,
                padding: configuredOption?.dataLabels ? 8 : 8,
                itemDistance: configuredOption?.dataLabels ? 5 : 20,
                x: configuredOption?.dataLabels ? 0 : 0,
              },
              chart: {
                marginLeft: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? 0
                    : undefined
                  : configuredOption?.enabledLegends
                  ? -250
                  : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 160 : 210,
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 480,
            },
            chartOptions: {
              title: {
                text: configuredOption?.showTotal
                  ? configuredOption?.abbreviateLargeNumber
                    ? total
                    : total
                  : configuredOption?.title || null,
                align: 'center',
                verticalAlign: 'middle',
                widthAdjust: configuredOption?.enabledLegends ? -160 : -120,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,
                y: configuredOption?.subTitle?.length ? -20 : 0,
                ...defaultDonutTitleOptions,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                text: configuredOption?.subTitle || null,
                align: 'center',
                verticalAlign: 'middle',
                widthAdjust: configuredOption?.enabledLegends ? -160 : -120,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -20
                  : 0,
                y: 0,
                ...defaultDonutSubTitleOptions,
                style: {
                  fontSize: '14px',
                },
              },
              legend: {
                enabled: configuredOption?.enabledLegends || false,
                verticalAlign: 'bottom',
                floating: false,
                layout: 'horizontal',
                align: 'center',
                width: 184,
                itemWidth: legendItemWidth,
                padding: 8,
                itemDistance: 5,
                y: -30,
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 0 : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 160 : 210,
                  dataLabels: {
                    distance: 15,
                    padding: 2,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 300,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,
                y: configuredOption?.subTitle?.length ? -20 : 0,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,

                style: {
                  fontSize: '14px',
                },
              },

              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 130 : 160,
                  dataLabels: {
                    distance: 6,
                    padding: 1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 250,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,
                y: configuredOption?.subTitle?.length ? -20 : 0,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : 0,

                style: {
                  fontSize: '14px',
                },
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 0 : undefined,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 110 : 160,
                  dataLabels: {
                    distance: 5,
                    padding: 1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 225,
            },
            chartOptions: {
              title: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? 0
                      : 0
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : -5,
                y: configuredOption?.subTitle?.length ? -20 : 0,
                style: {
                  fontSize: '18px',
                },
              },
              subtitle: {
                widthAdjust: configuredOption?.enabledLegends ? -50 : -50,
                x: configuredOption?.dataLabels
                  ? configuredOption?.enabledLegends
                    ? configuredOption?.subTitle?.length
                      ? 0
                      : 0
                    : 0
                  : configuredOption?.enabledLegends
                  ? configuredOption?.subTitle?.length
                    ? -5
                    : -5
                  : -5,

                style: {
                  fontSize: '14px',
                },
              },
              chart: {
                marginLeft: configuredOption?.enabledLegends ? 10 : 0,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 100 : 160,
                  dataLabels: {
                    distance: 3,
                    padding: 1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 200,
            },
            chartOptions: {
              legend: {
                itemWidth: legendItemWidth ? 90 : undefined,
                width: 180,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 85 : 160,
                  dataLabels: {
                    distance: 1,
                    padding: -1,
                    formatter: function (this: any) {
                      return this.y;
                    },
                  },
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 170,
            },
            chartOptions: {
              legend: {
                itemWidth: legendItemWidth ? 80 : undefined,
                width: 160,
              },
              plotOptions: {
                pie: {
                  size: configuredOption?.dataLabels ? 60 : 150,
                },
              },
            },
          },
        ],
      },
      series: series,
    };
    console.log('chart is', chart);

    return chart;
  }

  getPieChart(series: any, category: any, options: any) {
    const configuredOption = { ...options };
    const legendItemWidth = this.getItemWidth(series?.[0]);
    const chart = {
      chart: {
        style: {
          // fontFamily:''
        },
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
        enabled: configuredOption?.enabledLegends || false,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 5,
        itemMarginBottom: 5,
        itemStyle: { ...legendFontSize },
      },
      tooltips: {
        pointFormatter: function (this: any) {
          return (
            '<span style="color:' +
            this.series.color +
            ';">.</span><span style="fontSize:14px">' +
            this.series.name +
            ':<b>' +
            this.y +
            '</b></span><br/>'
          );
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: configuredOption?.dataLabels || false,
            formatter: function (this: any) {
              return this.y;
            },
            style: {
              ...dataLabelStyle,
              fontSize: '14px',
            },
          },
          showInLegend: true,
          // size:210
        },
      },
      responsive: {
        rules: [
          {
            condition: { maxWidth: 400 },
            chartOptions: {
              legend: {
                // enabled: configuredOption?.dataLabels || false,
                verticalAlign: 'bottom',
                floating: false,
                layout: 'horizontal',
                align: 'center',
                width: 220,
                itemWidth: legendItemWidth,
                padding: 8,
                itemDistance: 5,
              },
              title: {
                text: configuredOption?.title || null,
                ...defaultIpadTitleOptions,
              },
              subtitle: {
                text: configuredOption?.subTitle || null,
                ...defaultSubTitleOptions,
              },
            },
          },
        ],
      },
      series: series,
    };
    console.log('chart is', chart);
    return chart;
  }

  getTotalForPieSeries(series: any) {
    let total = 0;
    if (!series) {
      return total;
    }
    for (const serie of series) {
      for (const data of serie.data) {
        total += data.y;
      }
    }
    return total;
  }

  getPositionForMobile(series: any) {
    const legends = series.data.length || 0;
    const rows = Math.ceil(legends / 2);
    return {
      titlePosition: -1 * 10 * rows + 10 - 20,
      subtitlePosition: -1 * 10 * rows + 10,
    };
  }

  getItemWidth(series: any) {
    const legends = series?.data.length || 0;
    if (legends === 1) {
      return undefined;
    } else {
      return 92;
    }
  }
}
