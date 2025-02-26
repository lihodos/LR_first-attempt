import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};


  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }


  ngOnInit(): void {
    // קריאה לקובץ JSON
    this.userService.getUsers().subscribe(
      data => {
        this.user = data;
        
      },
      error => {
        
      }
    );
    this.userService.getUsers().subscribe(users => {
      for (let i = 0; i < this.user.length; i++) {
        const user = this.user[i];
        if (user['isLoggedIn']){
          this.user['name'] = user['firstName']
        this.user['email'] = user['email']
      }
      }
    });
  }




  // ניווט לעמוד הוספת תור
  goToAddAppointment(): void {
    this.router.navigate(['/profile/add-appointment']);  // עדכון הנתיב לעמוד הוספת תור
  }

  // ניווט לעמוד של כל התורים
  goToAllAppointments(): void {
    this.router.navigate(['/profile/all-appointments']);  // עדכון הנתיב לעמוד של כל התורים
  }

  // ניווט לעמוד הוספת שעות עבודה
  goToAddWorkHours(): void {
    this.router.navigate(['/profile/add-work-hours']);  // עדכון הנתיב לעמוד הוספת שעות עבודה
  }
}
