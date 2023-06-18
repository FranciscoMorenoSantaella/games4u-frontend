import { Component } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import Chart from 'chart.js/auto';
import chroma from 'chroma-js';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { PaypalService } from 'src/app/services/paypal.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    user?:User;
    gamelist:Game[] = [];
    sell:number = 0;
    arrayVentas:any;
    chart:any;
    cantidad:number = 0;
    constructor(private storage:StorageService, private gameservice:GameService, 
      private loadingservice:LoadingService, private userservice:UserService,
      private route: ActivatedRoute, private router: Router, private alertservice:AlertService, private paypalService:PaypalService){
       
    }



    async ngOnInit(){
      this.loadingservice.show();
      this.route.queryParams.subscribe(params => {
        const message = params['message'];
        const success = params['success'];
        if (success.toLowerCase() === "true") {
          this.alertservice.showSuccessMessage(message);
        } else {
          this.alertservice.showErrorMessage(message);
        }
      
      });
      await this.showData();
      await this.getGames();
      await this.getSellGames();
      await this.createChart();
      
      this.loadingservice.hide();
    }

    async showData(){
      this.user = await this.userservice.getUserByUid(this.storage.getSession().uid);
      this.storage.setSession(this.user);
    }

    async getGames(){
      this.gamelist = await this.gameservice.getGamesByPublisher(this.user!.id);
    }

    async getSellGames(){
      this.sell = await this.gameservice.countSellGames(this.user!.id);
    }

    async createChart(){
    const data = [];
    if(this.gamelist.length != 0) {
      for (let i = 0; i < this.gamelist.length; i++) {
        const game_id = this.gamelist[i].id;
        let publisher = await this.gameservice.getPublisherIdByGameId(game_id);
        console.log(publisher);
        let sells = await this.getSalesByGameId(game_id);
        data.push(sells);
      }
      const labels = this.gamelist.map(game => game.name);
      const colors = this.generateColors(data.length)
        this.chart = new Chart("MyChart", {
          type: 'doughnut', //this denotes tha type of chart
    
          data: {// values on X-Axis
            labels: labels, 
             datasets: [
              {
                label: "ventas",
                data: data,
                backgroundColor: colors
              },
            ]
          },
          options: {
            aspectRatio:1.5,
            responsive: true,
          }
        });
    }
  
    }

    /**
     * Metodo que genera una paleta de colores entre azul y rojo para el grafico
     * @param length es el numero de colores que queremos para el grafico
     * @returns un array con los colores
     */
    generateColors(length: number): string[] {
      const scale = chroma.scale(['blue', 'red']); // genera una escala de colores entre el azul y el rojo
      const colors = scale.colors(length); // genera un array de colores en esa escala con la longitud dada
      return colors;
    }

    async getSalesByGameId(game_id:number){
      let sells = await this.gameservice.getSalesByGameId(game_id);
      return sells;
    }

    async makePayment() {


      if(this.user != null){
    try {
      if(this.cantidad > 0){
      let url = await this.paypalService.createPayment(this.cantidad, 'EUR', 'paypal', 'sale', 'Payment description',this.user.id);
      window.location.href = url;
      }else{
        this.alertservice.showErrorMessage("Introduce una cantidad valida");
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }else{
    
  }
  }
  }

