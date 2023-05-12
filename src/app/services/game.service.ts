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
  public getGameByName(name:string): Promise<Game> {
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

  /**
   * Metodo que trae una lista de juegos segun su publisher
   * @param user_id es el id del publisher
   * @returns devuelve una lista de juegos
   */
  public getGamesByPublisher(user_id:number): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getgamesbypublisher/' + user_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public countSellGames(user_id:number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'countsellgames/' + user_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo para añadir un juego a la libreria de un usuario
   * @param game_id es el id del juego que vamos a añadir
   * @param user_id es el id del usuario al que se le va a añadir el juego
   * @returns un boolean para saber si se ha realizado la acción con exito
   */
  public addGameToLibrary(game_id:number,user_id:number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'addgametolibrary/' + game_id + '/' + user_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
  * Metodo que trae los juegos que tiene comprados un usuario 
  * @param user_id es el id del usuario del que vamos a traer los juegos comprados
  * @returns una lista de juegos
  */
  public getLibraryById(user_id:number): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getlibrarybyid/' + user_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getGameById(id:number): Promise<Game> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getPublisherByGameId(game_id:number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + "getpublisherbygameid/" + game_id,{responseType: 'text'})
          .toPromise();
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que comprueba si un juego esta en la biblioteca de un usuario
   * @param user_id es id del usuario del que se va a comprobar si el juego esta en su biblioteca
   * @param game_id es el id del juego que se va a comprobar si esta en la biblioteca
   * @returns devuelve el numero de filas devueltas, si es uno es que el juego esta en la biblioteca, si devuelve 0 es que no esta
   */
  public isGameInLibrary(user_id:number,game_id:number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'isgameinlibrary/' + user_id + '/' + game_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getGamesFromLibrary(page: Number, limit: Number, user_id:number): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getgamesfromlibrary/' + page + '/' + limit + '/' + user_id)
          .toPromise();
        let gamelist = result.content;
        resolve(gamelist);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getGamesFromWishlist(page: Number, limit: Number, user_id:number): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getgamesfromwishlist/' + page + '/' + limit + '/' + user_id)
          .toPromise();
        let gamelist = result.content;
        resolve(gamelist);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getGamesNotVerified(page: Number, limit: Number): Promise<Game[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getgamesnotverified/' + page + '/' + limit)
          .toPromise();
        let gamelist = result.content;
        resolve(gamelist);
      } catch (error) {
        reject(error);
      }
    });
  }

  public setGameVerified(game_id:number): Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .put(this.endpoint + 'setgameverified/' + game_id,{})
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public setGameVerifiedNull(game_id:number): Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .put(this.endpoint + 'setgameverifiednull/' + game_id,{})
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public deleteGameFromWishlist(game_id:number,user_id:number): Promise<number>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .delete(this.endpoint + 'deletefromwishlist/' + game_id + '/' + user_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }


  public getSalesByPayDate(game_id:number): Promise<Object[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getsalesbypaydate/' + game_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public getSalesByGameId(game_id:number): Promise<Object[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getsalesbygameid/' + game_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public haveGamesInLibrary(user_id:number):Promise<number>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'havegamesinlibrary/' + user_id)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

}
