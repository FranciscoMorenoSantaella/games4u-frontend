import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { Game } from 'src/app/models/Game';
import { AlertService } from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})
export class StadisticsComponent {
  public chart: any;
  public id:number = 0;
  public game!:Game;
  public ventas:any;


  constructor(private storage:StorageService,private loadingservice:LoadingService,
    private alertservice:AlertService,private gameservice:GameService,
    private userservice:UserService,private route: ActivatedRoute){}
    
    

 async ngOnInit() {
    this.loadingservice.show();
    this.id = this.route.snapshot.params['id'];
    await this.getGameById();
    await this.getsalesByPayDate();
    await this.createChart();
    this.loadingservice.hide();
  }

  async createChart(){
    const fechas = this.ventas.map((v: any[]) => v[1]);
    const sell = this.ventas.map((v: any[]) => v[0]);
    console.log(fechas);
    console.log(sell);
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: fechas, 
	       datasets: [
          {
            label: "ventas",
            data: sell,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  async getGameById(){
    this.game = await this.gameservice.getGameById(this.id);
  }

  async getsalesByPayDate(){
    this.ventas = await this.gameservice.getSalesByPayDate(this.id);
    console.log(this.ventas);
  }


  

 
}
