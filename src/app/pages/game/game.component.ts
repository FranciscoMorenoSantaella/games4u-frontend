import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { Order } from 'src/app/models/Order';
import { Shoppingcart } from 'src/app/models/Shoppingcart';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  isinlibrary: number = 0;
  isinshoppingcart: number = 0;
  id = 0;
  shoppingcartid: number = 0;
  game!: Game;
  user!: User;
  constructor(private route: ActivatedRoute, private gameservice: GameService,
    private loadingservice: LoadingService, private storage: StorageService,
    private orderservice: OrderService, private shoppingcartservice: ShoppingcartService,
    private alertservice:AlertService,private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.loadingservice.show();
    this.id = this.route.snapshot.params['id'];
    await this.getGameById();
    await this.getUser();
    this.loadingservice.hide();
    console.log(this.game);
}

  async getGameById() {
    this.game = await this.gameservice.getGameById(this.id);
  }

  async addGameToLibrary() {
    let aux = await this.gameservice.addGameToLibrary(this.game!.id, this.storage.getSession().id);
  }

  async getUser() {
    this.user = await this.storage.getSession();
  }

  async getLastShoppingCartIdNotPayedByUserId() {
    this.shoppingcartid = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByUserId(this.user.id);
  }

  async addProductToOrder() {
    await this.isGameInLibrary();
    await this.getLastShoppingCartIdNotPayedByUserId();
    console.log(this.user.id);
    if (this.isinlibrary == 0) {
      await this.isGameInShoppingCart();
      if(this.isinshoppingcart == 0){
        let order: Order = {
          id: -1,
          game: this.game,
          shoppingcart: { id: this.shoppingcartid, ispayed: false, user: this.user },
        }
        console.log(order);
        let funciona = await this.orderservice.postOrder(order);
        if(funciona != null){
          this.alertservice.showSuccessMessage("Se ha añadido al carro correctamente");
        }
      }else{
        this.alertservice.showInfoMessage("Ya esta añadido al carro de la compra");
      }
    } else {
      this.alertservice.showInfoMessage("Ya tienes este juego en tu biblioteca");
    }
}

  async isGameInLibrary() {
    this.isinlibrary = await this.gameservice.isGameInLibrary(this.user.id, this.game.id);
  }

  async isGameInShoppingCart(){
    this.isinshoppingcart = await this.shoppingcartservice.isGameInShoppingCart(this.user.id,this.game.id);
  }

  

}
