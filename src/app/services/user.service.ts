import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = "http://localhost:8080/user/"
  constructor(public http:HttpClient) { }


   /**
   * Metodo que sirve para crear un nuevo usuario en la aplicacion
   * @param user es el usuario que vamos a crear
   * @returns devuelve una promesa con el usuario
   */
   public async createUser(user:User):Promise<User>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post(this.endpoint, user).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

    /**
     * Metodo que trae a un usuario segun su uid
     * @param uid es la uid del clente (la que devuelve firebase)
     * @returns un usuario
     */
    public async getUserByUid(uid:String){
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.endpoint+ "conseguirusuario/" + uid).toPromise();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

}
