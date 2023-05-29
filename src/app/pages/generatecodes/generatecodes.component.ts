import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CodeService } from 'src/app/services/code.service';

@Component({
  selector: 'app-generatecodes',
  templateUrl: './generatecodes.component.html',
  styleUrls: ['./generatecodes.component.css']
})
export class GeneratecodesComponent {

    balance: number = 25;
    constructor(private codeservice:CodeService, private alertservice:AlertService){

    }

    async generateCode(balance:number){
      try {
        if(balance != null){
          let code = await this.codeservice.generatecode(balance);
          if(code != null){
            this.alertservice.showSuccessMessage(`El código ha sido generado correctamente: ${code.code} ` );
          }
        }
      } catch (error) {
        
      }
      
    }
}
