import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { iti } from 'src/app/Interfaces/iti';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'app-iti-details',
  templateUrl: './iti-details.component.html',
  styleUrls: ['./iti-details.component.css']
})
export class ItiDetailsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public httpClient : HttpClient, public authService : AuthService) { }
  itir : iti = null;
  ngOnInit() {
    const iti_id = this.route.snapshot.paramMap.get('id');
    let temp : string ;
    let t = iti_id;
    console.log("See this", t)
    temp = 'http://127.0.0.1:5002/itinerary/'+t;
    this.httpClient.get<iti>(temp).subscribe(data => {
      this.itir = data ;
      console.log(this.itir);
    })
  }

}
