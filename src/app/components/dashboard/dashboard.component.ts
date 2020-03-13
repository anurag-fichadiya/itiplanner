import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { DataService } from 'src/shared/services/data.service';
import { city } from 'src/shared/Interfaces/iternary';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(public authService :  AuthService, public dataService : DataService) { }
  ItineraryList : city[] = [ ];
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
      })
    })
  }
  getList() : void
  {
    console.log("CHECK : ", (this.ItineraryList[0]["Goa 1"])['daysCount']);
    console.log("CHECK : ME ", this.ItineraryList[0]["Goa 2"]);
    this.ItineraryList;
  }
}
