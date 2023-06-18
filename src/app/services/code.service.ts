import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Code } from '../models/Code';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  endpoint = environment.endpoint1 + "/code/";
  constructor(private http:HttpClient) { }

  public generatecode(balance:number): Promise<Code>{
    return new Promise(async (resolve, reject) => {
      try {
        const body = new HttpParams().set('balance', balance);
        let result: any = await this.http
          .post(this.endpoint + 'generatecode/',body)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public redeemCode(user_id:number,code:string): Promise<Code>{
    return new Promise(async (resolve, reject) => {
      try {
        const body = new HttpParams().set('user_id', user_id).set('code',code);
        let result: any = await this.http
          .post(this.endpoint + 'redeemcode/',body)
          .toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
