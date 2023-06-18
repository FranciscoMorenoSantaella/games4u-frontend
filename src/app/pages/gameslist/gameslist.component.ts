import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { Game } from 'src/app/models/Game';
import { File } from 'src/app/models/File';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/models/Genre';
@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent {
    actualpage = 0;
    gameperpage = 4;
    gamesearch:any;
    gamename:string = "";
    gamelist:Game[] = [];
    genrelist:Genre[] = [];
    isshort = false;
    selectedGenreId = 0;
    constructor(private gameservice:GameService, private router:Router, private loadingservice:LoadingService, private genreservice:GenreService){

    }

    async ngOnInit() {
      this.cargarJuegos();
      this.genrelist = await this.genreservice.getAllGenres();
    }

    async onGenreChange(event: any) {
      this.selectedGenreId = event.target.value;
      // Aquí puedes manejar la lógica para realizar acciones cuando cambie la opción seleccionada
      if(this.selectedGenreId != 0){
      this.gamelist = await this.gameservice.getGamesByGenre(0,4,this.selectedGenreId + "");
      }else{
        this.gamelist = await this.gameservice.getGamesByPage(this.actualpage,this.gameperpage);
      }
      this.actualpage = 0;
      // Realiza cualquier acción adicional que necesites
    }

    async cargarJuegos(){
      this.loadingservice.show();
      if(this.selectedGenreId == 0){
      this.gamelist = await this.gameservice.getGamesByPage(
        this.actualpage,
        this.gameperpage
        );
        console.log(this.gamelist);
      }else{
        this.gamelist = await this.gameservice.getGamesByGenre(this.actualpage,this.gameperpage,this.selectedGenreId + "");
      }
      this.loadingservice.hide();
    }

    async restPage() {
      this.actualpage--;
      this.loadingservice.show();
      this.cargarJuegos();
      this.loadingservice.hide();
    }

    async sumPage() {
      this.actualpage++;
      this.loadingservice.show();
      this.cargarJuegos();
      this.loadingservice.hide();      
    }

    async changePage(num:number){
      this.loadingservice.show();
      this.gamelist = await this.gameservice.getGamesByPage(
        num,
        this.gameperpage
        );
      this.actualpage = num;
      this.loadingservice.hide();
    }

    async getgamebyname(name:string){
      if(name.length >= 3){
      this.loadingservice.show();
      this.gamesearch = await this.gameservice.searchGameByName(name);
      this.router.navigate(['/search'],{state:{data:this.gamesearch}})
      this.loadingservice.hide();
      }else{
        this.isshort = true;
     
        this.isshort = false;
      } 
    }

  
}
