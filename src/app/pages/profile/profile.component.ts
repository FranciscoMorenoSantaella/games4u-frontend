import { Component } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import Chart from 'chart.js/auto';
import chroma from 'chroma-js';


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
    constructor(private storage:StorageService, private gameservice:GameService, private loadingservice:LoadingService){

    }

    async ngOnInit(){
      this.loadingservice.show();
      await this.showData();
      await this.getGames();
      await this.getSellGames();
      await this.createChart();
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

    async createChart(){
    const data = [];
    for (let i = 0; i < this.gamelist.length; i++) {
      const game_id = this.gamelist[i].id;
      let sells = await this.getSalesByGameId(game_id);
      data.push(sells);
    }
    const labels = this.gamelist.map(game => game.name);
    console.log(labels);
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
  }

