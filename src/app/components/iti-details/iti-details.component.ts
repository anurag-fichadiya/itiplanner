import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { iti } from 'src/app/Interfaces/iti';
import { AuthService } from 'src/shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-iti-details',
  templateUrl: './iti-details.component.html',
  styleUrls: ['./iti-details.component.css']
})
export class ItiDetailsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public httpClient : HttpClient, public authService : AuthService, private storage : AngularFireStorage) { }
  itir : iti = null;
  ngOnInit() {
    const iti_id = this.route.snapshot.paramMap.get('id');
    let temp : string ;
    let t = iti_id;
    console.log("See this", t)
    temp = 'http://iti-planner.herokuapp.com/itinerary/'+t;
    this.httpClient.get<iti>(temp).subscribe(data => {
      this.itir = data ;
      const no = Math.floor(Math.random() * 5) + 1;
      const nos : string = no.toString();
      let item = this.itir;
      let city_name = item.city;
      if(item.city !== 'Goa' && item.city !== 'Goa' && item.city !== 'Gujarat' && item.city !== 'Himachal Pradesh' &&item.city !== 'Kerala' && item.city !== 'Maharastra' && item.city !== 'Rajasthan' && item.city !== 'Sikkim')
      {
        city_name = 'Sikkim';
      }
      const tempo = city_name +'/'+ nos +'.jpg';
      item.imgurl = this.storage.ref(tempo).getDownloadURL();
      console.log(this.itir);
    })
  }

}
