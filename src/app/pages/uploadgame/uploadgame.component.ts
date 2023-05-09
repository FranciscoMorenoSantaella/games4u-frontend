import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenreService } from 'src/app/services/genre.service';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-uploadgame',
  templateUrl: './uploadgame.component.html',
  styleUrls: ['./uploadgame.component.css']
})
export class UploadgameComponent {
  cargando = true;
  genrelist: any;
  platformlist: any;
  gameForm: FormGroup;

  get name(){
    return this.gameForm.get('name') as FormControl
  }

  get description(){
    return this.gameForm.get('description') as FormControl
  }

  get genres(){
    return this.gameForm.get('genres') as FormControl
  }

  get platforms(){
    return this.gameForm.get('platforms') as FormControl
  }

  get executable(){
    return this.gameForm.get('executable') as FormControl
  }

  get image(){
    return this.gameForm.get('image') as FormControl
  }
  
  constructor(private genreservice: GenreService, private platformservice: PlatformService, private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,Validators.minLength(4),Validators.maxLength(32)
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      genres: [''],
      platforms: [''],
      executable: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.loadGenres();
    this.loadPlatforms();
    this.cargando = false;
  }

  /**
   * Metodo que carga un listado de generos
   */
  async loadGenres() {
    this.genrelist = await this.genreservice.getAllGenres();

  }

  /**
   * Metodo que carga un listado de plataformas 
   */
  async loadPlatforms() {
    this.platformlist = await this.platformservice.getAllPlatforms();
  }

  async uploadGame(){
    
  }
}
