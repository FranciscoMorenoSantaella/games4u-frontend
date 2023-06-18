import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor(private alertservice:AlertService,private route:Router) {}

  //Metodo para mostrar el spinner
  show() {
    this._loading.next(true);
    this.timeout(10000);
  }

  //Metodo para ocultar el spinner
  hide() {
    this._loading.next(false);
  }

  //Metodo para mostrar un error si la carga tarda demasiado
  timeout(time: number) {
    setTimeout(() => {
      if (this._loading.getValue()) {
        this.alertservice.showErrorMessage("No se ha podido establecer la conexión con el servidor");
        this.route.navigate(['']);
        this.hide();
      }
    }, time);
  }
}
