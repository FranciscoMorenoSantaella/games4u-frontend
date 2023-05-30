import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private http: HttpClient) { }

  

  public createPayment(price: number, currency: string, method: string, intent: string, description: string, user_id:number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const paymentData = {
          price: price,
          currency: currency,
          method: method,
          intent: intent,
          description: description,
          user_id:user_id
        
        };
  
        let response: any= await this.http
          .post(`http://localhost:8080/pay`, paymentData, { observe: 'response', responseType: 'text' })
          .toPromise();
  
        if (response.status === 200) {
          // Extraer la URL de redirección de PayPal del cuerpo de la respuesta
          const redirectUrl = response.body;
          resolve(redirectUrl);
        } else {
          reject(new Error('Unexpected response status: ' + response.status));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  

  executePayment(paymentId: string, payerId: string) {
    const executeData = {
      paymentId: paymentId,
      payerId: payerId
    };

    return this.http.get(`/api/pay/execute?paymentId=${paymentId}&payerId=${payerId}`);
  }
}
