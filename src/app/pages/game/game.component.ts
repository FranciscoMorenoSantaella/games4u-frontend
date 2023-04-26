import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { Order } from 'src/app/models/Order';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  name:string = "";
  game?:any;
  constructor(private route: ActivatedRoute, private gameservice:GameService, 
    private loadingservice:LoadingService, private storage:StorageService, private orderservice:OrderService) {}

  async ngOnInit() {
    this.loadingservice.show();
    this.name = this.route.snapshot.params['name'];
    this.getGameByName();
    this.addProductToOrder();
    this.loadingservice.hide();
  }

  async getGameByName(){
    this.game = await this.gameservice.getGameByName(this.name);
  }

  async addGameToLibrary(){
    let aux = await this.gameservice.addGameToLibrary(this.game.id,this.storage.getSession().id);
    console.log(aux);
  }

  async addProductToOrder(){
    let aaa = await this.gameservice.getGameByName(this.name);
    let order:Order = {
      id:-1,
      game:aaa,
      shoppingcart:{id:1, ispayed:false, total_price:0},
    }
    console.log(order);
     await this.orderservice.postOrder(order);
  }
  
}
