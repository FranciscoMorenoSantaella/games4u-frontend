import { Component } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    user?:User;
    gamelist:Game[] = [];
    sell:number = 0;
    constructor(private storage:StorageService, private gameservice:GameService, private loadingservice:LoadingService){

    }

    async ngOnInit(){
      this.loadingservice.show();
      this.showData();
      this.getGames();
      this.getSellGames();
      this.loadingservice.hide();
    }

    showData(){
      this.user = this.storage.getSession();
    }

    async getGames(){
      this.gamelist = await this.gameservice.getGamesByPublisher(this.user!.id);
    }

    async getSellGames(){
      this.sell = await this.gameservice.countSellGames(this.user!.id);
    }

}
