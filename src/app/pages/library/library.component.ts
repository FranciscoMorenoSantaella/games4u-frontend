import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/models/Game';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  gamelist:Game[] = [];
  actualpage:number = 0;
  gamesperpage:number = 5;
  user?:User;
  constructor(private gameservice:GameService,private loadingservice:LoadingService,
    private storage:StorageService, private router:Router, private http:HttpClient){

  }

 async ngOnInit(){
    this.getGamesFromLibrary();
    this.user = await this.storage.getSession();
    console.log(this.user)
  }
  
  /**
   * Metodo que trae los juegos de la biblioteca del usuario
   */
  async getGamesFromLibrary(){
    this.loadingservice.show();
    this.gamelist = await this.gameservice.getGamesFromLibrary(0,this.gamesperpage,7 );
    console.log(this.gamelist);
    this.loadingservice.hide();
  } 

  /**
   * Metodo que resta en 1 la pagina actual
   */
  async restPage() {
    this.actualpage--;
    this.loadingservice.show();
    this.getGamesFromLibrary();
    this.loadingservice.hide();
  }

  /**
   * Metodo que suma en 1 la pagina actual
   */
  async sumPage() {
    this.actualpage++;
    this.loadingservice.show();
    this.getGamesFromLibrary();
    this.loadingservice.hide();      
  }

  /**
   * Metodo que cambia a la pagina que se le introduzca
   * @param num El numero de la pagina a la que vamos a cambiar
   */
  async changePage(num:number){
    this.loadingservice.show();
    this.gamelist = await this.gameservice.getGamesFromLibrary(
      num,
      this.gamesperpage,
      4
      );
    this.actualpage = num;
    this.loadingservice.hide();
  }

  download(uniquename:string,originalname:string) {
    const url = 'http://localhost:8080/file/files/';
    this.http.get(url + uniquename, { responseType: 'blob' }).subscribe((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = originalname;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  


}
