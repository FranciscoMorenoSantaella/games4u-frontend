import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  gamelist:any;
  constructor(private gameservice:GameService){

  }

  ngOnInit(){
    
  }
  
}
