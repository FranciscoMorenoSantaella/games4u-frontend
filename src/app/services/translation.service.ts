import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any;

  constructor(private http: HttpClient) { }

  loadTranslations(lang: string): Promise<any> {
    const url = `assets/i18n/${lang}.json`;
    return this.http.get(url).toPromise().then((translations: any) => {
      this.translations = translations;
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || '';
  }
}
