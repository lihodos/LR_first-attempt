import { Component, OnInit  } from '@angular/core';
import { UserService } from '../user.service';


interface Appointment {
  date: string;
  time: string;
  description: string;
}



@Component({
  selector: 'app-all-appointments',
  standalone: false,
  
  templateUrl: './all-appointments.component.html',
  styleUrl: './all-appointments.component.css'
})
export class AllAppointmentsComponent implements OnInit {
  todayAppointments: Appointment[] = [];  // כל התורים להיום
  futureAppointments: Appointment[] = [];  // כל התורים לעתיד
  showFuture: boolean = false;    // האם להציג את התורים לעתיד

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // נטען את התורים מתוך ה-localStorage
    // const appointments: Appointment[] ;
    this.userService.getAppointments().subscribe((data)=>{
      this.futureAppointments=data;
    });
    
    // נפריד את התורים להיום ולתורים לעתיד
    const currentDate = new Date();
    
    this.todayAppointments = this.futureAppointments.filter((appointment: Appointment) => 
      new Date(appointment.date).toDateString() === currentDate.toDateString()
    );
    
    // this.futureAppointments = f.filter((appointment: Appointment) => 
    //   new Date(appointment.date) > currentDate
    // );
  }

  // פונקציה להחלפת מצב התצוגה של התורים לעתיד
  showFutureAppointments(): void {
    this.showFuture = !this.showFuture;
  }
}