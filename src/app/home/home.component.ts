import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('hoverEffect', [
      // מצב רגיל (ללא עכבר)
      state('normal', style({
        transform: 'scale(1)', // גודל רגיל
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // צל עדין
      })),
      // מצב כאשר העכבר על התמונה
      state('hover', style({
        transform: 'scale(1.1)', // הגדלה ב-10%
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' // צל חזק יותר
      })),
      // מעבר בין המקרים
      transition('normal <=> hover', [
        animate('0.3s ease') // זמן המעבר
      ])
    ])
  ]
})

export class HomeComponent {
  currentState = 'normal';

  toggleState() {
    this.currentState = this.currentState === 'normal' ? 'hover' : 'normal';
}
}