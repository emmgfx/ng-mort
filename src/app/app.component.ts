import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    
    originalRemainingCapital: number = 95000;
    originalRemainingMonths: number = 480;
    tae: number = 2.09;
    startDate: moment.Moment = moment("2014-10-1", "YYYY-MM-DD").endOf("month");
    vpa: boolean = false;
    amortizationAmount: number = 3000;
    amortizationFrecuency: number = 12;
    
    feesWithVPA: Array<any> = [];
    feesWithoutVPA: Array<any> = [];
    feesTable: Array<any> = [];
    interestsTotalDiff: number = 0;
    
    limit: number;
    
    constructor(){}
    
    ngOnInit(){}
    
    ngAfterViewInit() {}
    
    calculateFees(vpa: boolean = false){
                
        let _fees: Array<any> = [];
        
        let originalRemainingMonths = this.originalRemainingMonths;
        let originalRemainingCapital = this.originalRemainingCapital;
        let tae = this.tae;
        let interestsTotal: number = 0;
        let pendingCapital: number = this.originalRemainingCapital;
        let month: number = 0;
        let year: number = 0;
        let date: moment.Moment = moment(this.startDate);


        while( Math.round(pendingCapital * 100) / 100 > 0 && month <= originalRemainingMonths){
            let fee             = Math.round((pendingCapital * (tae/12) / (100 * ( 1 - Math.pow(1 + (tae/12) / 100, (month-originalRemainingMonths))))) * 100) / 100;
            let interests       = Math.round((pendingCapital * (tae/12) / 100) * 100) / 100;
            let amortization    = fee - interests;
            let _date           = moment(date.add(1, 'm').endOf('month'));
            
            month++;
            interestsTotal  += interests;
            pendingCapital  -= amortization;
            
            _fees.push({
                type: 'mandatory',
                originalRemainingMonths: originalRemainingMonths,
                originalRemainingCapital: originalRemainingCapital,
                month: month,
                year: Math.floor((month-1) / 12),
                fee: fee,
                tae: this.tae,
                interests: interests,
                interestsTotal: interestsTotal,
                pendingCapital: Math.abs(pendingCapital),
                amortization: amortization,
                date: _date
            });
            
            if(
                vpa &&
                month % this.amortizationFrecuency == 0 &&
                Math.round(pendingCapital * 100) / 100 > this.amortizationAmount
            ){
                pendingCapital -= this.amortizationAmount;
                _fees.push({
                    type: 'voluntary',
                    originalRemainingMonths: originalRemainingMonths,
                    originalRemainingCapital: originalRemainingCapital,
                    month: month,
                    year: Math.floor((month-1) / 12),
                    amortization: this.amortizationAmount,
                    pendingCapital: Math.abs(pendingCapital),
                    date: _date
                });
            }
            
        }
        
        return _fees;
    }
    
    run(){
        this.limit = 30;
        if(this.vpa){
            this.feesWithVPA = this.calculateFees(true);
            this.feesWithoutVPA = this.calculateFees(false);
            this.feesTable = this.feesWithVPA;
            
            this.interestsTotalDiff =
                this.feesWithoutVPA[this.feesWithoutVPA.length-1].interestsTotal -
                this.feesWithVPA[this.feesWithVPA.length-1].interestsTotal;
                
        }else{
            this.feesWithVPA = [];
            this.feesWithoutVPA = this.calculateFees(false);
            this.feesTable = this.feesWithoutVPA;
            this.interestsTotalDiff = 0;
        }
    }
    
    increaseLimit(){
        this.limit += 100;
    }
    
}
