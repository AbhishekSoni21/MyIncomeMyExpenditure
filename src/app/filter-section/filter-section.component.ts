import { AppServiceService, FilterModal } from './../app-service.service';
import { Component, OnInit } from '@angular/core';
import { MONTHS, MONTHSLIST } from '../highchart/helperData';
import { NETBALANCE } from '../highchart/mockData';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
})
export class FilterSectionComponent implements OnInit {
  selectedYearValue: { key: string; value: string } = {} as {
    key: string;
    value: string;
  };
  selectedMonthValue: { key: string; value: string } = {} as {
    key: string;
    value: string;
  };
  yearData: any[] = [];
  monthData: any[] = [];
  allData:any[]=[];
  constructor(private appService:AppServiceService ) {}

  ngOnInit(): void {
    const widgetData = JSON.parse(JSON.stringify(NETBALANCE));
    const sortedData = widgetData.sort((a: any, b: any) => {
      if (a.year != b.year) {
        return a.year - b.year;
      } else {
        return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
      }
    });
    console.log('sorted data', sortedData);
    const tempOption: FilterModal[] = [];
    sortedData.map((val: any) => {
      const isPresent = tempOption.filter((value) => value.key === val.year);

      if (isPresent.length === 0) {
        tempOption.push({
          key: val.year,
          value: val.year,
        });
      }
    });
    this.yearData = [...tempOption.reverse()];
    this.selectedYearValue = this.yearData[0];
    console.log('year----data', this.yearData);
    this.allData=sortedData;
    this.appService.selectedYear=this.selectedYearValue?.key
   this.getMonth(sortedData)
  }

  handleFilterChange(e: any, data: any, filtertype: any) {
    console.log('this.monthData', this.monthData);
    console.log('year', this.yearData);
    console.log('e', e);
    console.log('data', data);
    console.log('filter',filtertype)
    if(e.isUserInput){
      if(filtertype==='year'){
        this.selectedYearValue=data;
        this.appService.selectedYear=this.selectedYearValue?.key
        this.getMonth(this.allData)
      }else{
        this.selectedMonthValue=data;
        this.appService.selectedMonth=this.selectedMonthValue?.key
      }
    }
   
    return null;
  }

  getMonth(sortedData:any){
    console.log("this.monthdata----",sortedData);

    this.monthData = sortedData
    .filter((val: any) => val.year === this.selectedYearValue['key'])
    .map((data: any) => {
      return { key: data.month, value: data.month };
    }).sort((a:any,b:any)=> {return MONTHSLIST.indexOf(a.month) - MONTHS.indexOf(b.month)});

  console.log('this.monthData', this.monthData);
  console.log('year', this.yearData);

  this.selectedMonthValue = this.monthData.reverse()[0];
  this.appService.selectedMonth=this.selectedMonthValue?.key
  }
}
