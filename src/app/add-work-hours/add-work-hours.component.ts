import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-work-hours',
  standalone: false,
  
  templateUrl: './add-work-hours.component.html',
  styleUrl: './add-work-hours.component.css'
})
export class AddWorkHoursComponent implements OnInit {
  workHours = {
    openingTime: '',  // שעה פתיחה
    closingTime: ''   // שעה סגירה
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // טוענים את שעות העבודה מה-API
    this.userService.getWorkHours().subscribe(workHours => {
      if (workHours) {
        this.workHours = workHours;
      }
    });
  }

  onSubmit(): void {
    if (!this.workHours.openingTime || !this.workHours.closingTime) {
      alert("Please fill in both opening and closing times.");
      return;
    }

    // שולחים את השעות ל-API
    this.userService.updateWorkHours(this.workHours).subscribe(() => {
      alert("Work hours successfully updated!");
      this.router.navigate(['/profile']);  // חזרה לעמוד פרופיל
    });
  }
}