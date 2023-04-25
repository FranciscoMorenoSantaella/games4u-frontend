import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logout = false;
  constructor(private gameservice:GameService,private storage:StorageService, private router:Router){

  }

  ngOnInit(){
    this.showLogout();
   
  }

  async showLogout(){
    if(this.storage.getSession() == null){
      this.logout = false;
    }else{
      this.logout = true;
    }

  }

  closeSession(){
    this.storage.clearSession();
    this.router.navigate(['']);
    this.logout = false;
  }

}
