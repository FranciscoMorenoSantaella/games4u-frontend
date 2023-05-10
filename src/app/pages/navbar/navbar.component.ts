import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { GameService } from 'src/app/services/game.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;
  logout = false;

  constructor(
    private gameservice: GameService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
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
