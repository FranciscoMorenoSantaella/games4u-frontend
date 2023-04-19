import { Component } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-uploadgame',
  templateUrl: './uploadgame.component.html',
  styleUrls: ['./uploadgame.component.css']
})
export class UploadgameComponent {
    cargando = true;
    genrelist:any;
    platformlist:any;
    constructor(private genreservice:GenreService, private platformservice:PlatformService){

    }

    async ngOnInit() {
      this.loadGenres();
      this.loadPlatforms();
      this.cargando = false;
    }

    /**
     * Metodo que carga un listado de generos
     */
    async loadGenres(){
      this.genrelist = await this.genreservice.getAllGenres();

    }

    /**
     * Metodo que carga un listado de plataformas 
     */
    async loadPlatforms(){
      this.platformlist = await this.platformservice.getAllPlatforms();
      console.log(this.platformlist);
    }
}
