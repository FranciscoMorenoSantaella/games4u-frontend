import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRating } from '../models/UserRating';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserratingService {

  endpoint = environment.endpoint1 + "/userrating/";
  constructor(private http:HttpClient){

  }

  public setUserRating(userrating: UserRating): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const body = {
          user: userrating.user,
          game: userrating.game,
          valoracion: userrating.valoracion
        };
  
        let result: any = await this.http
          .put(this.endpoint + 'setuserrating', body)
          .toPromise();
  
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  
 
  
  
  
  
  
  

}
