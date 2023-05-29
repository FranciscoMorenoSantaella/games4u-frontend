import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CodeService } from 'src/app/services/code.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addbalance',
  templateUrl: './addbalance.component.html',
  styleUrls: ['./addbalance.component.css']
})
export class AddbalanceComponent {
    code:string = "";
    constructor(private codeservice:CodeService, private storage:StorageService, 
      private alertservice:AlertService, private loadingservice:LoadingService){

    }


    async redeemCode(code: string) {
      try {
        if (code != null) {
          let thecode = await this.codeservice.redeemCode(this.storage.getSession().id, code);
          if (thecode?.used) {
            this.alertservice.showErrorMessage("Este código ya ha sido usado anteriormente");
          } else {
            this.alertservice.showSuccessMessage("Código canjeado correctamente");
          }
        } else {
          this.alertservice.showErrorMessage("El código no puede ser nulo");
        }
      } catch (error: any) {
        if (error.status === 0) {
          this.alertservice.showErrorMessage("No se ha podido establecer conexión con el servidor");
        } else if(error.status === 400){
          this.alertservice.showErrorMessage("Metodo no encontrado");
        }else{
          this.alertservice.showErrorMessage("Ha ocurrido un error mientras se canjeaba el código")
        }
    }
  }
}
