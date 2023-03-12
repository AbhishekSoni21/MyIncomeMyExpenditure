import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor() { }

  private _selectedYear:BehaviorSubject<FilterModal> = new BehaviorSubject<FilterModal>({} as FilterModal)
  private _selectedMonth = new BehaviorSubject({} as FilterModal)

  get selectedYear(){
    return this._selectedYear
  }

  set selectedYear(value:any){
    this._selectedYear.next(value)
  }

  get selectedMonth(){
    return this._selectedMonth
  }

  set selectedMonth(value:any){
    this._selectedMonth.next(value)
  }

}

export interface FilterModal{
   key: string; value: string 
}

