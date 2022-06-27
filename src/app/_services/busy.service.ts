import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRerquestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy(){
    this.busyRerquestCount++;
    this.spinnerService.show(undefined, {
      type: "line-scale-party",
      bdColor: 'rgba(255,255,255,0.5)',
      color: '#333333'
    })
  }
  idle(){
    this.busyRerquestCount--;
    if(this.busyRerquestCount <=0)
    {
      this.busyRerquestCount = 0;
      this.spinnerService.hide();
    }
  }
}
