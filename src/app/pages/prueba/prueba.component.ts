import { Component } from '@angular/core';
import { PaypalService } from 'src/app/services/paypal.service';


@Component({
  selector: 'app-prueba',
  template: `
    <button (click)="makePayment()">Make Payment</button>
  `
})
export class PruebaComponent {
  constructor(private paypalService: PaypalService) { }

  async makePayment() {
    let a = await this.paypalService.createPayment(10.0, 'USD', 'paypal', 'sale', 'Payment description');
    console.log(a);
    
  }

}