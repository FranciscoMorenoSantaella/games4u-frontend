import { Injectable } from '@angular/core';
import { Platform } from '../models/Platform';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  endpoint = environment.endpoint1 + "/platform/";
  constructor(private http:HttpClient) { }

  /**
   * Metodo que devuelve todas las plataformas
   * @returns una lista de plataformas
   */
  public async getAllPlatforms():Promise<Platform> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint)
          .toPromise()) as Platform;
          
        resolve(result);

      } catch (error) {
        reject(error);
      }
    });
  }
}
