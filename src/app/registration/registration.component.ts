import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  standalone: false,
  
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;  // הגדרת FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,  // הזרקת Router
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+972|05)\d{8}$/)]]
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      // const userData = this.registrationForm.value;
      const Udata= {
        firstName:this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email:this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      phone:this.registrationForm.value.phone,
      isLoggedIn:false,
      appointments:[],
      workHours:[],
      hairCuts:[]
    
    }
      this.userService.addUser(Udata).subscribe((response: any) => {
        console.log('User added:', response);
        this.router.navigate(['/login']);
      }, error => {
        console.log('Error adding user:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }}
  