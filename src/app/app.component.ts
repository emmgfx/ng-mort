import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    originalRemainingCapital: number = 95000;
    originalRemainingMonths: number = 480;
    tae: number = 2.7;
    startDate = new Date();
    
    interestsTotal: number = 0;
    pendingCapital: number = this.originalRemainingCapital;
    
    
    ngOnInit(){
        
        let month: number = 1;
        let year: number = 0;

        console.log(Math.round(this.pendingCapital * 100) / 100);
        
        // while( Math.round(this.pendingCapital * 100) / 100 > 0 && month <= this.originalRemainingMonths ){
        //     let fee             = Math.round((this.pendingCapital * (this.tae/12) / (100 * ( 1 - Math.pow(1 + (this.tae/12) / 100, (month-this.originalRemainingMonths))))) * 100) / 100;
        //     let interests       = Math.round((this.pendingCapital * (this.tae/12) / 100) * 100) / 100;
        //     let amortization    = fee - interests;
        //     this.interestsTotal  += interests;
        //     this.pendingCapital  -= amortization;
        // }
        
    }
    
    
}
