import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { DataService } from 'src/shared/services/data.service';
import { city } from 'src/shared/Interfaces/iternary';
import { HttpClient } from '@angular/common/http';
import { iti } from './../../Interfaces/iti';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(public authService :  AuthService, public dataService : DataService, public httpClient : HttpClient ) { }
  ItineraryList : city[] = [ ];
  user : any;
  reco_list : iti[];
  ngOnInit()
   {
    let temp : string ;
    let t = JSON.parse(localStorage.getItem("user"))
    console.log("See this", t.uid)
    temp = 'http://127.0.0.1:5002/'+t.uid;
    this.httpClient.get<iti[]>(temp).subscribe(data => {
      this.reco_list = data ;
      console.log(this.reco_list);
    })
  }
}
