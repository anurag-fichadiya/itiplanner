import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { DataService } from 'src/shared/services/data.service';
import { city } from 'src/shared/Interfaces/iternary';
import { HttpClient } from '@angular/common/http';
import { iti } from './../../Interfaces/iti';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public authService :  AuthService, public dataService : DataService, public httpClient : HttpClient ) { }
  ItineraryList : city[] = [ ];
  filteredItineraryList: city[] = [];
  
  user : any;
  reco_list : iti[];
  ngOnInit()
   {
    this.dataService.getAll().snapshotChanges().subscribe(res => {
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
  }
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredItineraryList = this.listFilter ? this.performFilter(this.listFilter) : this.ItineraryList;
  }

  performFilter(filterBy: string): city[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.ItineraryList.filter((_city: city) =>
      _city.$key.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}