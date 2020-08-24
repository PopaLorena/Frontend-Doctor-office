import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import {LoginComponent} from './login/login.component'
import {SignupComponent} from './signup/signup.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'patient/edit/:id', component: PatientFormComponent },
  { path: 'patient/new', component: PatientFormComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'appoitment/edit/:id', component: AppointmentFormComponent },
  { path: 'appointment/new/:patientId', component: AppointmentFormComponent },
   { path: 'login', component: LoginComponent },
   {path: 'homePage', component: HomePageComponent},
   {path: 'signup', component: SignupComponent},
  { path: 'appointment/:patientId', component: AppointmentListComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
