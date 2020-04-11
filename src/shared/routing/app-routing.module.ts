import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../../app/components/sign-in/sign-in.component';
import { SignUpComponent } from '../../app/components/sign-up/sign-up.component';
import { DashboardComponent } from '../../app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../app/components/forgot-password/forgot-password.component';
import { AuthGuard } from "../guard/auth.guard";
import { VerifyEmailComponent } from '../../app/components/verify-email/verify-email.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { ItiDetailsComponent } from 'src/app/components/iti-details/iti-details.component';
import { HistoryComponent } from 'src/app/components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate : [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'search', component: SearchComponent, canActivate : [AuthGuard] },
  { path: 'itinerary/:id', component: ItiDetailsComponent, canActivate : [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate : [AuthGuard] },
  { path: 'customize', redirectTo : '/dashboard', pathMatch: 'full'  },
  { path: '**', redirectTo : '/sign-in', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }