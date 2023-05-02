import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  endpoint = "http://localhost:8080/shoppingcart/"
  constructor(private http:HttpClient) { }

  /**
   * Metodo que devuelve el id del ultimo carro de la compra que aun no ha pagado
   * @param user_id es el id del usuario del que queremos saber su ultimo carro de la compra con ispayed = false
   * @returns devuelve una promesa con el id del ultimo carro de la compra que no esta pagado
   */
  public async getLastShoppingCartIdNotPayedByUserId(
    user_id: number
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(user_id);
        let result: any = (await this.http
          .get(
            this.endpoint +
              'getlastshoppingcartidnotpayedbyuserid' +
              '/' +
              user_id
          )
          .toPromise()) as number;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async isGameInShoppingCart(
    user_id: number, game_id:number
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(user_id);
        let result: any = (await this.http
          .get(
            this.endpoint +
              'isgameinshoppingcart' +
              '/' +
              user_id + '/' + game_id
          )
          .toPromise()) as number;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  
  /**
   * Metodo que calcula el precio total de la suma de todos los juegos
   * @param shoppingcart_id es el id del carro de la compra
   * @returns devuelve una promesa con el precio total
   */
  public async getTotalPrice(shoppingcart_id: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint + 'totalprice' + '/' + shoppingcart_id)
          .toPromise()) as number[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
