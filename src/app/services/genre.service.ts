import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  endpoint = environment.endpoint1 + "/genre/";
  constructor(private http:HttpClient) { }

  /**
   * Metodo que devuelve una lista de generos
   * @returns una lista de generos
   */
  public async getAllGenres():Promise<Genre[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint)
          .toPromise()) as Genre;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
