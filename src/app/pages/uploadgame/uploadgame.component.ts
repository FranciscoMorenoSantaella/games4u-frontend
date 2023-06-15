import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GenreService } from 'src/app/services/genre.service';
import { PlatformService } from 'src/app/services/platform.service';
import { StorageService } from 'src/app/services/storage.service';

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

  get name() {
    return this.gameForm.get('name') as FormControl
  }

  get description() {
    return this.gameForm.get('description') as FormControl
  }

  get price() {
    return this.gameForm.get('price') as FormControl
  }

  get genres() {
    return this.gameForm.get('genres') as FormControl
  }

  get platforms() {
    return this.gameForm.get('platforms') as FormControl
  }

  get executable() {
    return this.gameForm.get('executable') as FormControl
  }

  get image() {
    return this.gameForm.get('image') as FormControl
  }

  constructor(private genreservice: GenreService, private platformservice: PlatformService, private fb: FormBuilder, private gameservice: GameService, private storage:StorageService) {
    this.gameForm = this.fb.group({
      name: [
        '',
        [
          Validators.required, Validators.minLength(4), Validators.maxLength(32)
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      price: ['', [Validators.required]],
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

  async onSubmit() {
    if (this.gameForm.valid) {
      const name = this.gameForm.get('name')?.value;
      const description = this.gameForm.get('description')?.value;
      const genresvalues = this.gameForm.get('genres')?.value;
      const genres = Array.isArray(genresvalues) ? genresvalues.map(Number) : [Number(genresvalues)];
      const platformValues = this.gameForm.get('platforms')?.value;
      const platforms = Array.isArray(platformValues) ? platformValues.map(Number) : [Number(platformValues)];
      const user_id = this.storage.getSession().id;
      const price = Number(this.gameForm.get('price')?.value);
      const executable = (document.getElementById('customFile') as HTMLInputElement)?.files?.[0];
      const image = (document.getElementById('formFileMultiple') as HTMLInputElement)?.files?.[0];
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      genres.forEach((genre) => formData.append('genre', String(genre)));
      platforms.forEach((platform) => formData.append('platform', String(platform)));
      formData.append('user_id', String(user_id));
      formData.append('price', String(price));
      if (executable) {
        formData.append('executable', executable);
      }
      if(image){
      formData.append('image', image);
      }
      try {
        const response = await this.gameservice.createGame(formData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
  
    
}
