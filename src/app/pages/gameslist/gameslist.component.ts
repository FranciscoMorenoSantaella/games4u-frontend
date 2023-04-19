import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent {
    cargando = true;
    actualpage = 0;
    gameperpage = 4;
    gamesearch:any;
    gamelist:any;
    gamelist2:any;
    constructor(private gameservice:GameService){

    }

    async ngOnInit() {
      this.cargarJuegos();
    }

    async cargarJuegos(){
      this.gamelist = await this.gameservice.getGamesByPage(
        this.actualpage,
        this.gameperpage
        );
      this.cargando = false;
    }

    async restPage() {
      this.actualpage--;
      this.cargando = true;
      this.cargarJuegos();
      this.cargando = false;
    }

    async sumPage() {
      this.actualpage++;
      this.cargando = true;
      this.cargarJuegos();
      this.cargando = false;      
    }

    async changePage(num:number){
      this.cargando = true;
      this.gamelist = await this.gameservice.getGamesByPage(
        num,
        this.gameperpage
        );
      this.actualpage = num;
      this.cargando = false;
    }

    async getgamebyname(name:string){
      this.gamesearch = await this.gameservice.getGameByName(name);
    }
    
}
