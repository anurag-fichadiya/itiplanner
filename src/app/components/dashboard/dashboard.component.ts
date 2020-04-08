import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { DataService } from 'src/shared/services/data.service';
import { city } from 'src/shared/Interfaces/iternary';
import { iti } from './../../Interfaces/iti';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  profileUrl: Observable<string | null>;
  constructor(public authService :  AuthService, public dataService : DataService, public storage : AngularFireStorage ) { }
  
  ItineraryList : city[] = [ ];
  user : any;
  reco_list : iti[];
  reco_listtemp : iti[];
  ngOnInit()
   {
    let temp : string ;
    let t = JSON.parse(localStorage.getItem("user"))
    console.log("See this", t.uid)
    temp = 'user/'+t.uid;
    this.dataService.getpy(temp).subscribe(data => {
      this.reco_listtemp = data;
      this.reco_list = this.anu(this.reco_listtemp) ;
      console.log("typeof(this.reco_list)",typeof(this.reco_list));
      let count = 1;
      this.reco_list.forEach(item => {
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
