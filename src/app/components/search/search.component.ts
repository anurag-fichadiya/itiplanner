import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { DataService } from 'src/shared/services/data.service';
import { HttpClient } from '@angular/common/http';

import { iti } from './../../Interfaces/iti';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public authService :  AuthService, public dataService : DataService, public httpClient : HttpClient ) { }
  
  ItineraryList : iti[] ;
  ItineraryListtemp : iti[] ;
  filteredItineraryList: iti[];
  temp : string = 'http://127.0.0.1:5002/itinerary';
  
  ngOnInit()
   {
     return this.dataService.getpy()
     //.pipe(
    //  map((data) => data.map((item) => (new iti(item))) 
    //)
     .subscribe(data => 
      {
        this.ItineraryListtemp = data;
        this.ItineraryList = this.anu(this.ItineraryListtemp);
        //this.ItineraryListtemp.forEach(item =>
        //  this.ItineraryList.push(item as iti))
        //for(let x of this.ItineraryListtemp)
        //{
        //  this.ItineraryList.push(x as iti);
        //}
        //this.ItineraryList = data.map(item => new iti(item))
        //let t = data.map(item => new iti(item))
        this.filteredItineraryList = this.ItineraryList;
        console.log("See here typeof iti list", typeof(this.ItineraryList))
      })
    /*this.dataService.getAll().snapshotChanges().subscribe(res => {
      //console.log('res', res)
      res.forEach(t => {
        //console.log('t',t.payload);
        const a = t.payload.toJSON();
        a['$key'] = t.key; 
        console.log('a is ',a as city);
        this.ItineraryList.push(a as city);
        this.filteredItineraryList.push(a as city);
      })
    })
    let temp : string;
    temp = 'http://127.0.0.1:5002/itinerary';
    this.httpClient.get<iti[]>(temp).subscribe(data => {
      data.forEach(item => 
        {
          this.ItineraryList.push(item)
          this.filteredItineraryList.push(item)
        })
    }); DATA IS JSON - SO FOREACH WORKS ON ARRAYS ONLY*/
    /*return this.httpClient.get<iti[]>(this.temp).subscribe(data => {
      this.ItineraryList = data.map(item => {
        return new iti(item.id, item.daysCount, item.places, item.ratings, item.totalCost)
      })
      this.filteredItineraryList = Array.from(data)
      console.log("This iti list", this.ItineraryList[0].id)
    })*/
  }

  anu (value: any, args?: any[]): any[] 
    {
      // check if "routes" exists
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value);
        let dataArr = [];
        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
            console.log("This if from anu fn : key", key);
            console.log("This if from anu fn : val", value[key]);
        });
        // return the resulting array
        return dataArr;
      }
    }
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredItineraryList = this.listFilter ? this.performFilter(this.listFilter) : this.ItineraryList;
    console.log("This list filtered and sent ",this.filteredItineraryList)
  }
  performFilter(filterBy: string): iti[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.ItineraryList.filter( 
      (_iti : iti) => //a fn input arg to filter
      {
        let t = [ ];
        _iti.places.forEach(pl => 
        { 
          console.log("pl",pl);
          t.push( pl.toLocaleLowerCase().indexOf(filterBy) !== -1);// T F fn
        }
        );
        let t1 = (_iti.city.toLocaleLowerCase().indexOf(filterBy) !== -1) 
        let t2 = false
        t.forEach(item => {
          t2 = t2 || item
        });
        return t2 || t1;
      }
    )
  }
}