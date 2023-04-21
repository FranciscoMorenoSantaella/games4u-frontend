import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  name:string = "";
  game?:any;
  constructor(private route: ActivatedRoute, private gameservice:GameService) {}

  async ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.getGameByName();
  }

  async getGameByName(){
    this.game = await this.gameservice.getGameByName(this.name);
    console.log(this.game);
  }
}
