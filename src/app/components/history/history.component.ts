import { Component, OnInit, asNativeElements } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { DataService } from 'src/shared/services/data.service';
import { HttpClient } from '@angular/common/http';

import { iti } from './../../Interfaces/iti';
import { AngularFireStorage } from '@angular/fire/storage';
import { city } from 'src/shared/Interfaces/iternary';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  ItineraryList : iti[] ;
  constructor(public authService : AuthService, public dataService : DataService,  public httpClient : HttpClient, public storage : AngularFireStorage) { }
  ngOnInit()
  {
    let user = JSON.parse(localStorage.getItem("user"));
    console.log("Frm histoty",user)
    this.dataService.getpy("history/"+user.uid)
    .subscribe( data => {
      console.log("from history ", data);
      this.ItineraryList = this.anu(data);
      let count = 1;
      this.ItineraryList.forEach(item => {
        //const no = Math.floor(Math.random() * 5) + 1;
        count = count + 1;
        const nos : string = count.toString();
        if(count == 5)
        {
          count = 1;
        }
        let city_name = item.city;
        if(item.city !== 'Goa' && item.city !== 'Goa' && item.city !== 'Gujarat' && item.city !== 'Himachal Pradesh' &&item.city !== 'Kerala' && item.city !== 'Maharastra' && item.city !== 'Rajasthan' && item.city !== 'Sikkim')
        {
          city_name = 'Sikkim';
        }
        const tempo = city_name +'/'+ nos +'.jpg';
        console.log("Prep img url", tempo)
        item.imgurl = this.storage.ref(tempo).getDownloadURL();
      });  
    })
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
}