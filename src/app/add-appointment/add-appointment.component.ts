import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface Appointment {
  date: string;
  time: string;
  description: string;
  price?: number | null;
}

@Component({
  selector: 'app-add-appointment',
  standalone: false,
  
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent implements OnInit {
  appointment = {
    email: '',
    date: '',        // תאריך התור
    time: '',        // שעה לתור
    description: '' , // תיאור התור
    price: null,
  };
  descriptionOptions: string[] = [
    'Haircut',
    'Hair Color',
    'Styling',
    'Blow Dry',
    'Shampoo & Conditioner',
    'Hair Extensions',  // תוספות שיער
    'Hair Straightening',  // החלקה
    'Evening Hairstyle',  // תסרוקות ערב
    'Bridal Hairstyle'  // תסרוקת כלה
  ];
  existingAppointments: Appointment[] = [];  // כל התורים הקיימים
  workHours: { openingTime: string, closingTime: string } = {
    openingTime: '',
    closingTime: ''
  };

  constructor(private router: Router,
    private userService: UserService) { }

    ngOnInit(): void {
      // כאן אתה קורא לשירות כדי לקבל את שעות העבודה
      this.userService.getWorkHours().subscribe(
        workHours => {
          this.workHours = workHours;  // עדכון את שעות העבודה במשתנה של הקומפוננטה
        },
        error => {
          console.log('Error fetching work hours:', error);  // טיפול בשגיאות
        }
      );
  
      // כאן אתה קורא לשירות כדי לקבל את כל התורים
      this.userService.getAppointments().subscribe(
        appointments => {
          this.existingAppointments = appointments;  // עדכון את התורים במשתנה של הקומפוננטה
        },
        error => {
          console.log('Error fetching appointments:', error);  // טיפול בשגיאות
        }
      );
    }
  
  
    onSubmit(): void {
      console.log('Appointment data:', this.appointment);
      if (!this.appointment.date || !this.appointment.time || !this.appointment.description) {
        alert("Please fill in all fields (date, time, and description).");
        return;
      }
  
      const appointmentDate = new Date(`${this.appointment.date}T${this.appointment.time}`);
      const currentDate = new Date();
  
      // השוואה אם התור לא נמצא בעבר
      if (appointmentDate.getTime() <= currentDate.getTime()) {
        alert("Date and time cannot be in the past.");
        return;
      }
  
      // השוואת שעות העבודה
      const openingTime = new Date(`${this.appointment.date}T${this.workHours.openingTime}`);
      const closingTime = new Date(`${this.appointment.date}T${this.workHours.closingTime}`);
  
      if (appointmentDate < openingTime || appointmentDate > closingTime) {
        alert("Appointment time must be within working hours.");
        return;
      }
  
      // בדיקה אם התור כבר תפוס
      const isTaken = this.existingAppointments.some(appointment =>
        new Date(appointment.date).getTime() === appointmentDate.getTime()
      );
  
      if (isTaken) {
        alert("The selected appointment is already taken.");
        return;
      }
  
      // אם הכל בסדר, נשמור את התור
      this.userService.saveAppointment(this.appointment).subscribe(() => {
        alert("Appointment successfully scheduled!");
        this.router.navigate(['/profile']);
      });
    }
  }