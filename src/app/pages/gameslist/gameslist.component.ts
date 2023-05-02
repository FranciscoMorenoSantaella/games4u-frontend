import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { Game } from 'src/app/models/Game';
import { File } from 'src/app/models/File';
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
    gamelist!:Game[];
    isshort = false;
    constructor(private gameservice:GameService, private router:Router, private loadingservice:LoadingService){

    }

    async ngOnInit() {
      this.cargarJuegos();
    }

    async cargarJuegos(){
      this.loadingservice.show();
      this.gamelist = await this.gameservice.getGamesByPage(
        this.actualpage,
        this.gameperpage
        );
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
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.isshort = false;
      } 
    }
}
