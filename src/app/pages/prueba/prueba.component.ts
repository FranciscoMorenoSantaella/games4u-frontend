import { Component } from '@angular/core';
import { PaypalService } from 'src/app/services/paypal.service';


@Component({
  selector: 'app-prueba',
  template: `prueba.component.html`
})
export class PruebaComponent {
  constructor(private paypalService: PaypalService) { }



}