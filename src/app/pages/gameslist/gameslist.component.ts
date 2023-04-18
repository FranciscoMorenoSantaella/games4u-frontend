import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent {
    gamelist:any;
    constructor(private gameservice:GameService){

    }

    async ngOnInit() {
      this.gamelist = await this.gameservice.getGamesByPage(
        0,
        5
        );
      console.log(this.gamelist);

      
    }
}
