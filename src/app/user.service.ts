import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';  // כתובת ה-API לשימוש
  private loggedInUserSubject = new BehaviorSubject<any | null>(null); // BehaviorSubject לאחסון המשתמש המחובר
  private apiUrlApp = 'http://localhost:3000/appointments';  // כתובת ה-API לשימוש
  private apiUrlWH = 'http://localhost:3000/workHours';  // כתובת ה-API לשימוש

  constructor(private http: HttpClient) { 
       // טוען את המשתמש המחובר (אם יש) כאשר השירות נטען
       this.loadLoggedInUser();
      }
        // טוען את המשתמש המחובר
      private loadLoggedInUser(): void {
        this.getUsers().pipe(
          map(users => users.find(user => user.isLoggedIn === true))
        ).subscribe(user => {
          if (user) {
            this.loggedInUserSubject.next(user);
          }
        });
      }

  // המתודה לקבלת המשתמש המחובר
  getUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();  // מחזיר את המשתמש המחובר הנוכחי
  }

 // המתודה לעדכון השם של המשתמש
 updateUserName(email: string, newName: string): Observable<any> {
  return this.getUsers().pipe(
    map(users => {
      const user = users.find(u => u.email === email);
      if (user) {
        return { ...user, name: newName };  // עדכון שם המשתמש
      }
      return null;
    }),
    switchMap(updatedUser => {
      if (updatedUser) {
        return this.http.put<any>(`${this.apiUrl}/${updatedUser.id}`, updatedUser); // עדכון ה-API
      }
      return of(null);
    }),
    switchMap(() => {
      // לאחר העדכון בשרת, נעדכן את המשתמש המקומי
      return this.getUsers().pipe(
        map(users => users.find(user => user.isLoggedIn === true)) // שליפת המשתמש המחובר לאחר העדכון
      );
    }),
    map(user => this.loggedInUserSubject.next(user)) // עדכון ה-BehaviorSubject עם המשתמש המעודכן
  );
}


  // פונקציה לעדכון סטטוס התחברות של המשתמש
  updateUserLoginStatus(userId: string, isLoggedIn: boolean): Observable<any> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.id === userId);
        if (user) {
          return { ...user, isLoggedIn };  // עדכון סטטוס התחברות
        }
        return null;
      }),
      switchMap(updatedUser => {
        if (updatedUser) {
          return this.http.put<any>(`${this.apiUrl}/${userId}`, updatedUser);  // עדכון בשרת
        }
        return of(null);
      }),
      switchMap(() => {
        // לאחר העדכון בשרת, נעדכן את המשתמש המקומי
        return this.getUsers().pipe(
          map(users => users.find(user => user.isLoggedIn === true))
        );
      }),
      map(user => this.loggedInUserSubject.next(user))  // עדכון ה-BehaviorSubject
    );
  }
  logoutUserFromApi(): Observable<any> {
    // עדכון ה-BehaviorSubject כדי להפסיק את החיבור
    this.loggedInUserSubject.next(null);
    return of(null); // מחזירים Observable ריק
  }

  // מתודה לשליפת משתמשים
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // מחזיר את כל המשתמשים מה-API
  }

  // פונקציה להוספת משתמש חדש
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // פונקציה לקבלת תורים על פי ה-ID של המשתמש המחובר
  getAppointmentsForLoggedInUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlApp).pipe(
      map(appointments => appointments.filter(appointment => appointment.userId === userId))  // מסנן לפי ה-ID של המשתמש
    );
  }

  // פונקציה להוספת תור חדש
  createAppointment(appointment: any): Observable<any> {
    console.log(appointment,this.apiUrlApp)
    return this.http.post<any>(this.apiUrlApp, appointment);
  }

  // פונקציה לעדכון שעות העבודה
  updateWorkHours(workHours: { openingTime: string, closingTime: string }): Observable<any> {
    return this.http.put<any>(this.apiUrlWH, workHours);
  }

  // המתודה לקבלת שעות העבודה
  getWorkHours(): Observable<any> {
    return this.http.get<any>(this.apiUrlWH);  // תקבל שעות עבודה מהשרת
  }

  // מתודה לקבלת התורים
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlApp);
  }

  // מתודה לשמירת תור
  saveAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.apiUrlApp, appointment);
  }

}

// json-server --watch src/assets/db.json --port 3000