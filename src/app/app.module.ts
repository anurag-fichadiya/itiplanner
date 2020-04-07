import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms'
 
import { AppComponent } from './app.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components//dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components//sign-up/sign-up.component';
import { VerifyEmailComponent } from './components//verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { AppRoutingModule } from './../shared/routing/app-routing.module';
import { AuthService } from 'src/shared/services/auth.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { DataService } from 'src/shared/services/data.service';
import { KeysPipe } from './components/dashboard/dashboard.pipe';
import { StarComponent } from './components/dashboard/star.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchComponent } from './components/search/search.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ItiDetailsComponent } from './components/iti-details/iti-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    KeysPipe,
    StarComponent,
    SearchComponent,
    TopBarComponent,
    ItiDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
