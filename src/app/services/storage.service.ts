import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly SESSION_KEY = 'my_app_session';
  private readonly SECRET_KEY = "a";
  private sessionSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.getSession());

  constructor() {}

  setSession(sessionData: any): void {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sessionData), this.SECRET_KEY).toString();
    localStorage.setItem(this.SESSION_KEY, encryptedData);
    this.sessionSubject.next(sessionData);
  }

  getSession(): any {
    const encryptedData = localStorage.getItem(this.SESSION_KEY);
    if (encryptedData) {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    }
    return null;
  }

  getSessionObservable(): Observable<any> {
    return this.sessionSubject.asObservable();
  }

  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.sessionSubject.next(null);
  }
}
