import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent {

  shoppingcartid: number = 0;
  user?:User;
  precio:number = 0;
  orderlist:any;
  constructor(private shoppingcartservice:ShoppingcartService, private loadingservice:LoadingService, 
    private storage:StorageService, private orderservice:OrderService,private userservice:UserService){

  }

  async ngOnInit(){
    this.loadingservice.show();
    this.user = await this.storage.getSession();
    await this.getLastShoppingCartIdNotPayedByClientId(this.user!.id);
    await this.getOrderByShoppingCartId(this.shoppingcartid);
    await this.getTotalPrice();
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
  }

   /**
   * Metodo que calcula el precio final de los productos multiplicando la cantidad de cada uno por el precio del producto
   */
   async getTotalPrice() {
    if(this.orderlist != 0){
    this.precio = await this.shoppingcartservice.getTotalPrice(
      this.shoppingcartid
    );
    this.precio = Number(this.precio.toFixed(2));
    }else{
      this.precio = 0;
    }
  }

  /**
   * Metodo que trae las ordenes del carro de la compra
   * @param shoppingcart_id es la id del carro de la compra del que queremos traer sus ordenes
   */
    async getOrderByShoppingCartId(shoppingcart_id: number) {
      this.orderlist = await this.orderservice.getOrderByShoppingCartId(
        shoppingcart_id
      );
    } 

    async getUser(){
      this.user = await this.userservice.getUserByUid(this.user!.uid);
      this.storage.setSession(this.user);
    }
}
