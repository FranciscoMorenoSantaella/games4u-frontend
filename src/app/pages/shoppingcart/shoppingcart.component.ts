import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/services/loading.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent {

  shoppingcartid: number = 0;
  user?:User;
  constructor(private shoppingcartservice:ShoppingcartService, private loadingservice:LoadingService, private storage:StorageService){

  }

  async ngOnInit(){
    this.loadingservice.show();
    this.user = this.storage.getSession();
    this.getLastShoppingCartIdNotPayedByClientId(this.user!.id);
    this.loadingservice.hide();
  }

 
  /**
    * Metodo que trae el ultimo carro no pagado de un usuario
    * @param user_id es el id del usuario del que queremos traer su ultimo carro no pagado
    */
  async getLastShoppingCartIdNotPayedByClientId(user_id: number) {
    this.shoppingcartid =
      await this.shoppingcartservice.getLastShoppingCartIdNotPayedByUserId(
        user_id
      );
    console.log(this.shoppingcartid);
  }
}
