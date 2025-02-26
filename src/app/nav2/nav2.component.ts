import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav2',
  standalone: false,

  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.css'
})
export class Nav2Component implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;

  userSubscription: Subscription | null = null; // אתחול לערך null

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // הירשמות ל-BehaviorSubject כדי לעדכן את המצב באופן אוטומטי
    this.userSubscription = this.userService.getUser().subscribe(user => {
      if (user !== null) {
        this.isLoggedIn = true;
        this.userName = user.firstName;
      } else {
        this.isLoggedIn = false;
        this.userName = null;
      }
    });
  }

  logout(): void {
    this.userService.logoutUserFromApi().subscribe(() => {
      console.log('User logged out');
      this.router.navigate(['/'])
    });
  }

  ngOnDestroy(): void {
    // חשוב לבצע unsubscribe כדי להימנע מבעיות זיכרון
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

