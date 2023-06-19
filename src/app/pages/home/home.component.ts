import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  translations:any;
  constructor(private route: ActivatedRoute, private router: Router, private translationservice:TranslationService) { }

  ngOnInit(){
    const lang = 'en'; // Idioma seleccionado
    this.translationservice.loadTranslations(lang).then(() => {
    this.translations = {
      home1: this.translationservice.getTranslation('home1'),
      home2:this.translationservice.getTranslation('home2'),
      home3:this.translationservice.getTranslation('home3'),
      home4:this.translationservice.getTranslation('home4'),
      home5:this.translationservice.getTranslation('home5'),
      home6:this.translationservice.getTranslation('home6'),
      home7:this.translationservice.getTranslation('home7'),
      home8:this.translationservice.getTranslation('home8'),
      home9:this.translationservice.getTranslation('home9'),
      home10:this.translationservice.getTranslation('home10'),
    };
    })
  }

}
