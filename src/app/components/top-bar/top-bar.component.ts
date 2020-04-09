import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  userdetails : any;
  uname : string;
  constructor(public authService :  AuthService, public fireDB: AngularFireDatabase)
  {
    let user = this.authService.userData;
    let name : string;
    this.userdetails = this.fireDB.database
      .ref("Users")
      .child(user.uid)
      .once('value')
      .then((data) => name = data.val());
    console.log("GOT user name", this.userdetails)
    console.log("From top bar", this.authService.userData)
    console.log("From top bar - localstorage", JSON.parse(localStorage.getItem("user")))
    this.uname = this.userdetails.then(data => this.uname = data.name);
    console.log("Final uname", this.uname)
  }
  
}