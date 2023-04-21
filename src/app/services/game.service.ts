import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  endpoint: any = "http://localhost:8080/game/";
  constructor(private http:HttpClient){

  }

  /**
   * Metodo para traer juegos por pagina 
   * @param page es la pagina de los productos que queremos traer 
   * @param limit es el numero de juegos que traeremos por pagina
   * por ejemplo la pagina 0 con limite 10 traera los juegos del 1 al 9
   * @returns devuelve una promesa de una lista de productos
   */
  public getGamesByPage(page: Number, limit: Number): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getgame/' + page + '/' + limit)
          .toPromise();
        let gamelist = result.content;
        resolve(gamelist);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo en el que se busca juegos segun su nombre
   * @param name es el nombre del juego
   * @returns un listado de juegos
   */
  public searchGameByName(name:string): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(name);
        let result: any = await this.http
          .get(this.endpoint + 'searchgamebyname/' + name)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Metodo en el que se trae un juego segun su nombre
   * @param name es el nombre del juego
   * @returns devuelve un juego
   */
  public getGameByName(name:string): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(name);
        let result: any = await this.http
          .get(this.endpoint + 'getgamebyname/' + name)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
