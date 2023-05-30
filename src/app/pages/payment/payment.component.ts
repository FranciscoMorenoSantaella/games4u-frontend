import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { PaypalService } from 'src/app/services/paypal.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  user!:User;
  constructor(private paypalService: PaypalService,private storage:StorageService) { }

  ngOnInit(){
    this.user = this.storage.getSession();
  }

  async makePayment() {


    if(this.user != null){
  try {
    let url = await this.paypalService.createPayment(150.0, 'USD', 'paypal', 'sale', 'Payment description',this.user.id);
    alert(url);
    window.location.href = url;
  } catch (error) {
    console.log('Error:', error);
  }
}else{
  
}
}
}
