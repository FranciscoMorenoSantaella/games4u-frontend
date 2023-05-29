import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { UserRating } from 'src/app/models/UserRating';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserratingService } from 'src/app/services/userrating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() valoracion: number | null = null;
  @Input() maxRating = 5;
  maxRatingArr: any = [];
  @Input() SelectedStar = 0;
  @Input() game!:Game;
  previousSelection = 0;
  @Input() vacio:number = 5;
  rating!:UserRating;
  user!:User;
  constructor(private userratingservice:UserratingService, private storage:StorageService, private alertservice:AlertService) { }
 
  HandleMouseEnter(index: number) {
    this.SelectedStar = index + 1;
  }

  HandleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    } else {
      this.SelectedStar = 0;
    }
  }

  async submitValoracion(index: number) {

    try {
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
    this.rating = {
      id : 0,
      game: this.game,
      user: this.user,
      valoracion: this.SelectedStar
    };
    let row:number =  await this.userratingservice.setUserRating(this.rating);
    if(row == 1){
        this.alertservice.showSuccessMessage(`Tu valoración del juego ahora es ${this.SelectedStar}`)
    }else{
      this.alertservice.showErrorMessage(`No se ha podido modificar la valoración`);
    }
  }catch(error:any){

  }
  }

  async ngOnInit() {
    this.user = await this.storage.getSession();
    this.maxRatingArr = Array(this.maxRating).fill(0);
    if(this.valoracion != null){
      this.SelectedStar = this.valoracion;
      this.previousSelection = this.SelectedStar;
    }
  }

  isStarSelected(index: number): boolean {
    return this.valoracion !== null && index < this.valoracion;
  }
}
