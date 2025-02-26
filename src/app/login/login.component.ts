import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // הגדרת טופס התחברות
  user: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // שדה אימייל
      password: ['', [Validators.required, Validators.minLength(6)]] // שדה סיסמא
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      // חיפוש המשתמש ב-API
      this.userService.getUsers().subscribe(users => {
        const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
        console.log('User found:', user);
        if (user) {
          // אם המשתמש נמצא, לאתחל את הסטטוס של "האם מחובר"
          this.userService.updateUserLoginStatus(user.id, true).subscribe(
            updatedUser => {
              console.log('User logged in:', updatedUser);
              this.router.navigate(['/profile']); // מעבר לדף פרופיל
            },
            error => {
              console.error('Error updating login status:', error); // הודעת שגיאה אם יש
            }
          );
        } else {
          console.log('Invalid credentials');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
