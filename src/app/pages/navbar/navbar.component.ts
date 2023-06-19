import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { GameService } from 'src/app/services/game.service';
import { StorageService } from 'src/app/services/storage.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;
  logout = false;
  translations: any;

  constructor(
    private gameservice: GameService,
    private storage: StorageService,
    private router: Router,
    private translationservice:TranslationService
  ) {}

  ngOnInit() {
    const lang = 'en'; // Idioma seleccionado
    this.translationservice.loadTranslations(lang).then(() => {
      this.translations = {
        library: this.translationservice.getTranslation('library'),
        wishlist:this.translationservice.getTranslation('wishlist'),
        publish:this.translationservice.getTranslation('publish'),
        profile:this.translationservice.getTranslation('profile'),
        games:this.translationservice.getTranslation('games'),
        addsalary:this.translationservice.getTranslation('addsalary'),
        logoutt:this.translationservice.getTranslation('logoutt'),
        signin:this.translationservice.getTranslation('signin'),
        signup:this.translationservice.getTranslation('signup'),
      };
    });
  
    this.showLogout();
    this.getUser();
  }

  showLogout() {
    this.storage.getSessionObservable().subscribe(sessionData => {
      this.logout = !!sessionData;
    });
  }

  closeSession() {
    this.storage.clearSession();
    this.router.navigate(['']);
    this.logout = false;
  }

  async getUser() {
    try {
      this.storage.getSessionObservable().subscribe(sessionData => {
        this.user = sessionData;
      });
    } catch (error) {
      // Manejar el error si es necesario
    }
  }
}
