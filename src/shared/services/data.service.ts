import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { city } from '../Interfaces/iternary';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  _ItineraryList : AngularFireList<city>;

  constructor(public db : AngularFireDatabase) {  }
  
  getAll() : AngularFireList<city>  {
    this._ItineraryList = this.db.list('/Itinerary') as AngularFireList<city>;
    //console.log(this._ItineraryList)
    return this._ItineraryList;
  }
}
