import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'LR';
  // userName: string | null = null;  // הוספנו משתנה לשם המשתמש
  // isLoggedIn: boolean = false;  // אם המשתמש מחובר או לא
  // users: any[] = [];
  // newUser = { name: ' ', email: ' ' };

  constructor(private userService: UserService, private router: Router) {}
  
  
  
  
  ngOnInit(): void {
    // this.userService.getUser().subscribe(user => {
    //   if (user) {
    //     this.userName = user.firstName;
    //     this.isLoggedIn = true;
    //     console.log("User is logged in", user);
    //   } else {
    //     console.log("No user logged in");
    //   }
    // });
  }

  // login() {
  //   // דוגמת התחברות עם משתמש
  //   const user = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', isLoggedIn: true }; // דוגמה
  //   this.userService.addUser(user).subscribe((newUser) => {
  //     this.userName = newUser.firstName; // עדכון השם
  //     this.isLoggedIn = true;  // עדכון מצב ההתחברות
  //     this.router.navigate(['/profile']);  // מעבר לעמוד פרופיל אחרי התחברות
  //   });
  // }

  // logout() {
  //   // קריאה לפונקציה של logout ב-UserService
  //   this.userService.logoutUserFromApi().subscribe(() => {
  //     this.userName = null; // מחיקת שם המשתמש
  //     this.isLoggedIn = false;  // עדכון המצב
  //     this.router.navigate(['/']);  // חזרה לעמוד הבית
  //   });
  // }
}

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe((users: any[]) => {  // טיפוס users הוא Array
//       const loggedInUser = users.find((user: any) => user.email === 'john.doe@example.com');
//       if (loggedInUser) {
//         this.userName = loggedInUser.firstName;
//         this.isLoggedIn = true;
//         console.log("User is logged in", loggedInUser);
//       } else {
//         console.log("No user logged in");
//       }
//     });
//   }

//   login() {
//     const user = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
//     this.userService.addUser(user).subscribe((newUser: any) => {
//       this.userName = newUser.firstName;
//       this.isLoggedIn = true;
//       this.router.navigate(['/profile']);
//     });
//   }

//   logout() {
//     this.userName = null;
//     this.isLoggedIn = false;
//     this.router.navigate(['/']);
//   }
// }