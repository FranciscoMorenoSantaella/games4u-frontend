import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';
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
    private storage:StorageService, private orderservice:OrderService,private userservice:UserService,
    private alertservice:AlertService, private gameservice:GameService){

  }

  async ngOnInit(){
    this.loadingservice.show();
    this.user = await this.storage.getSession();
    await this.getLastShoppingCartIdNotPayedByClientId(this.user!.id);
    await this.getOrderByShoppingCartId(this.shoppingcartid);
    await this.getTotalPrice();
    console.log(this.orderlist);
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

    async payShoppingCart(){
      this.loadingservice.show();
      await this.getOrderByShoppingCartId(this.shoppingcartid);
      await this.getTotalPrice();
      this.loadingservice.hide();
      let confirmed = await this.alertservice.showConfirmAlert("¿Estás seguro de que quieres realizar la compra? precio final " + this.precio);
      if(confirmed){
        this.loadingservice.show();
        await this.getUser();
        if(this.user!.balance >= this.precio){
          let payed = await this.shoppingcartservice.payShoppingCart(this.user!.id,this.shoppingcartid);
          for (let index = 0; index < this.orderlist.length; index++) {
            this.gameservice.addGameToLibrary(this.orderlist[index].game.id,this.user!.id);
          }

          if(payed){
            this.alertservice.showSuccessMessage("La compra se ha realizado correctamente");
          }else{
            this.alertservice.showErrorMessage("Ha ocurrido un error y no se ha podido pagar, inténtalo mas tarde");
          }
        }else{
          this.alertservice.showErrorMessage("No tienes suficiente saldo");
        }
      }else{

      }
      await this.getUser();
      this.loadingservice.hide();
    }

    async removeFromShoppingCart(index:number){
      this.orderlist.splice(index,1);
    }
}
