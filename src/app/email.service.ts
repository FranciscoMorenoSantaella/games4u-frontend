import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  endpoint = "http://localhost:8080/email/";
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
