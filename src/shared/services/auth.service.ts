import { Injectable, NgZone } from "@angular/core";
import { User } from "../services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {  AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import { UserDetail } from "src/app/Interfaces/user-detail";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public fireDB: AngularFireDatabase,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        console.log("from main afauth - authstate", this.userData);
        console.log("from main afauth - authstate localstorage",JSON.parse(localStorage.getItem("user")));
      } else {
        this.userData = null;
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          console.log("from signin frunction \n ", result.user);
          this.userData = result.user;
          localStorage.setItem("user", JSON.stringify(this.userData));
          this.SetUserData(result.user);
          this.router.navigate(["dashboard"]);
        });
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, mobNo: any, aname: any) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserDataNew(result.user, mobNo, aname);
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.userData = result.user;
        //this.userData.user.displayName = aname;
        localStorage.setItem("user", JSON.stringify(this.userData));
        //console.log("from signup ", t.user)
        console.log("from SIGNUP  email pwd frunction \n ", result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["verify-email-address"]);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch(error => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null  && user.emailVerified !== false ? true : false;
  }//Email verified requied to check as anyone can change our local storage

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => 
      {
        this.ngZone.run(() => 
        {
          this.SetUserData(result.user);
          this.SetUserDataNew(result.user, "0000000000", result.user.displayName)
          console.log("from authlogin frunction \n ", result.user);
          this.userData = result.user;
          localStorage.setItem("user", JSON.stringify(this.userData));
          console.log("login success - redirecting", this.userData);
          this.router.navigate(["dashboard"]);
        });
      })
      .catch(error => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    });
  }

  //Inserting user data in Users table
  SetUserDataNew(user, mobNo, name) {
    const userData: UserDetail = {
      name: name,
      email: user.email,
      mobNo: mobNo
    };
    console.log("/---------------Hello------------------/" + mobNo);
    this.fireDB.database
      .ref("Users")
      .child(user.uid)
      .set(userData);
  }
}
