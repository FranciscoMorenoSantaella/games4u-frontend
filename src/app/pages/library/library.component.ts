import { Component, Input } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Game } from 'src/app/models/Game';
import { UserRating } from 'src/app/models/UserRating';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  showRating = true;
  gamelist:Game[] = [];
  actualpage:number = 0;
  gamesperpage:number = 5;
  user!:User;
  count:number = 0;
  constructor(private gameservice:GameService,private loadingservice:LoadingService,
    private storage:StorageService, private router:Router, private http:HttpClient){

  }

 async ngOnInit(){
    this.loadingservice.show();
    this.user = await this.storage.getSession();
    await this.getGamesFromLibrary();
    await this.haveGamesInLibrary();
    this.loadingservice.hide();
  }
  
  /**
   * Metodo que trae los juegos de la biblioteca del usuario
   */
  async getGamesFromLibrary(){
    try {
      this.gamelist = await this.gameservice.getGamesFromLibrary(this.actualpage,this.gamesperpage,this.user!.id );
      console.log(this.gamelist);
      this.checkRating();
    } catch (error) {
      
    }
  } 
  
 checkRating(){
  for(let game of this.gamelist){
    if(game.ratings){
      for(let ratings of game!.ratings){
        if(ratings.user.id === this.user.id){
          this.showRating = false;
        }
      }
    }
  }
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
    try {
      this.loadingservice.show();
      this.gamelist = await this.gameservice.getGamesFromLibrary(
        num,
        this.gamesperpage,
        this.user!.id
        );
      this.actualpage = num;
      this.loadingservice.hide();
    } catch (error) {
      
    }
  }

  download(uniquename:string,originalname:string) {
    try {
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
    } catch (error) {
      
    }
  }

  async haveGamesInLibrary(){
    try {
      this.count = await this.gameservice.haveGamesInLibrary(this.user!.id);
    } catch (error) {
      
    }
  }
}

