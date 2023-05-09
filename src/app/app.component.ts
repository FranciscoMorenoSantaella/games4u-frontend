import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = this.loadingservice.loading$;

  constructor(public loadingservice:LoadingService){

  }

  ngOnInit(){
    
  }
  title = 'Games4u-Frontend';
}
