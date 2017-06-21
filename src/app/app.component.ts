import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    remaningYears: number = 40;
    remaningMonths: number = this.remaningYears * 12;
    tae: number = 2.7;
    
    
    
}
