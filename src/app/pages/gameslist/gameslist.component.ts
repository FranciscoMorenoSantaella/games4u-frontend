import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

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
    gamename:string = "";
    gamelist:any;
    gamelist2:any;
    isshort = false;
    constructor(private gameservice:GameService, private router:Router){

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
      if(name.length >= 3){
      this.cargando = true;
      this.gamesearch = await this.gameservice.searchGameByName(name);
      this.router.navigate(['/search'],{state:{data:this.gamesearch}})
      this.cargando = false;
      }else{
        this.isshort = true;
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.isshort = false;
      }
      
    }
    
}
