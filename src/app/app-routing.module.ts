import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';
import { AddWorkHoursComponent } from './add-work-hours/add-work-hours.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/add-appointment', component: AddAppointmentComponent },
  { path: 'profile/all-appointments', component: AllAppointmentsComponent },
  { path: 'profile/add-work-hours', component: AddWorkHoursComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
