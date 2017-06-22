import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

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
    fees: Array<any> = [];
    
    working: boolean = false;
    
    ngOnInit(){
        // this.calculateFees();
    }
    
    ngAfterViewInit() {
        // this.calculateFees();
    }

    
    calculateFees(){
                
        this.working = true;
        this.fees = [];
        
        let originalRemainingMonths = this.originalRemainingMonths;
        let originalRemainingCapital = this.originalRemainingCapital;
        let tae = this.tae;
        let interestsTotal: number = 0;
        let pendingCapital: number = this.originalRemainingCapital;
        let month: number = 0;
        let year: number = 0;

        while( Math.round(pendingCapital * 100) / 100 > 0 && month <= originalRemainingMonths){
            let fee             = Math.round((pendingCapital * (tae/12) / (100 * ( 1 - Math.pow(1 + (tae/12) / 100, (month-originalRemainingMonths))))) * 100) / 100;
            let interests       = Math.round((pendingCapital * (tae/12) / 100) * 100) / 100;
            let amortization    = fee - interests;
            month++;
            interestsTotal  += interests;
            pendingCapital  -= amortization;
            
            this.fees.push({
                originalRemainingMonths: originalRemainingMonths,
                originalRemainingCapital: originalRemainingCapital,
                month: month,
                year: Math.floor((month-1) / 12),
                fee: fee,
                tae: this.tae,
                interests: interests,
                interestsTotal: interestsTotal,
                pendingCapital: pendingCapital,
                amortization: amortization
            });
        }
        
        this.working = false;
    }
    
    
}
