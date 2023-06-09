import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Order } from '../models/Order';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  endpoint = environment.endpoint1 + "/order/";
  constructor(private http:HttpClient) { }

  public async postOrder(order:Order):Promise<Order>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post(this.endpoint, order).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

   /**
   * Metodo que trae las ordenes de un carro de la compra
   * @param shoppingcart_id 
   * @returns 
   */
   public async getOrderByShoppingCartId(
    shoppingcart_id: Number
  ): Promise<Order[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint +
              'getorderbyshoppingcartid' +
              '/' + 
              shoppingcart_id
          )
          .toPromise()) as Order[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public deleteOrder(game_id:number,shoppingcart_id:number): Promise<number>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .delete(this.endpoint + 'deleteorder/' + game_id + '/' + shoppingcart_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
