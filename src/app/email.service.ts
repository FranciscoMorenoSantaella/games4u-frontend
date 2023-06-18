import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  endpoint = environment.endpoint1 + "/email/";
  constructor(private http:HttpClient) { }

  public sendEmail(toEmail: string, subject: string, body: string): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.post<Boolean>(this.endpoint + 'sendemail/?toEmail=' + toEmail + '&subject=' + subject + '&body=' + body,{}).toPromise();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  
}
