import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { Order } from 'src/app/models/Order';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { OrderService } from 'src/app/services/order.service';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  isinlibrary: any;
  isinshoppingcart: any;
  gamelist: Game[] = [];
  actualpage: number = 0;
  gamesperpage: number = 1;
  user!: User;
  shoppingcartid: any;
  constructor(private gameservice: GameService, private loadingservice: LoadingService,
    private storage: StorageService, private router: Router, private http: HttpClient,
    private alertservice: AlertService, private shoppingcartservice: ShoppingcartService, private orderservice: OrderService) {

  }

  async ngOnInit() {
    this.user = this.storage.getSession();
    this.getGamesFromWishlist();
  }

  /**
   * Metodo que trae los juegos de la lista de deseados del usuario
   */
  async getGamesFromWishlist() {
    this.loadingservice.show();
    this.gamelist = await this.gameservice.getGamesFromWishlist(this.actualpage, this.gamesperpage, this.user!.id);
    console.log(this.gamelist);
    this.loadingservice.hide();
  }

  async addProductToOrder(game_id: number) {
    await this.isGameInLibrary(game_id);
    await this.getLastShoppingCartIdNotPayedByUserId();
    if (this.isinlibrary == 0) {
      await this.isGameInShoppingCart(game_id);
      let game = await this.gameservice.getGameById(game_id);
      if (this.isinshoppingcart == 0) {
        let order: Order = {
          id: -1,
          game: game,
          shoppingcart: { id: this.shoppingcartid, ispayed: false, user: this.user },
        }
        let funciona = await this.orderservice.postOrder(order);
        if (funciona != null) {
          let row = await this.deleteGameFromWishlist(game_id, this.user.id);
          console.log(row);
          if (row == 1) {
            this.alertservice.showSuccessMessage("Se ha añadido al carro correctamente");
          }
        }
      } else {
        this.alertservice.showInfoMessage("Ya esta añadido al carro de la compra");
      }
    } else {
      this.alertservice.showInfoMessage("Ya tienes este juego en tu biblioteca");
    }
  }

  async getLastShoppingCartIdNotPayedByUserId() {
    this.shoppingcartid = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByUserId(this.user!.id);
  }

  async isGameInLibrary(game_id: number) {
    this.isinlibrary = await this.gameservice.isGameInLibrary(this.user!.id, game_id);
  }

  async isGameInShoppingCart(game_id: number) {
    this.isinshoppingcart = await this.shoppingcartservice.isGameInShoppingCart(this.user!.id, game_id);
  }

  async deleteGameFromWishlist(game_id: number, user_id: number) {
    return this.gameservice.deleteGameFromWishlist(game_id, user_id);
  }

  /**
   * Metodo que resta en 1 la pagina actual
   */
  async restPage() {
    this.actualpage--;
    this.loadingservice.show();
    this.getGamesFromWishlist();
    this.loadingservice.hide();
  }

  /**
   * Metodo que suma en 1 la pagina actual
   */
  async sumPage() {
    this.actualpage++;
    this.loadingservice.show();
    this.getGamesFromWishlist();
    this.loadingservice.hide();
  }

  /**
   * Metodo que cambia a la pagina que se le introduzca
   * @param num El numero de la pagina a la que vamos a cambiar
   */
  async changePage(num: number) {
    this.loadingservice.show();
    this.actualpage = num;
    this.getGamesFromWishlist();
    this.loadingservice.hide();
  }



}
