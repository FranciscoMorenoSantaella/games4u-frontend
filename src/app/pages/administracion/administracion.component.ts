import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmailService } from 'src/app/email.service';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {
  gamelist: Game[] = [];
  actualpage: number = 0;
  gamesperpage: number = 4;
  user?: User;
  count: number = 0;

  constructor(private http: HttpClient, private gameservice: GameService,
    private loadingservice: LoadingService, private alertservice: AlertService,
    private emailservice: EmailService) {

  }
  

  async ngOnInit() {
    this.loadingservice.show();
    await this.getGamesNotVerified();
    this.loadingservice.hide();
  }
  download(uniquename: string, originalname: string) {
    const url = 'https://drive.google.com/uc?export=download&id=1yD9EMYM1Cz5zQgDNiBiPp1Po0iVIKGJ7';
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = originalname;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  
  

  /**
   * Metodo que resta en 1 la pagina actual
   */
  async restPage() {
    this.loadingservice.show();
    this.actualpage--;
    this.getGamesNotVerified();
    this.loadingservice.hide();
  }

  /**
   * Metodo que suma en 1 la pagina actual
   */
  async sumPage() {
    this.loadingservice.show();
    this.actualpage++;
    this.getGamesNotVerified();
    this.loadingservice.hide();
  }

  /**
   * Metodo que cambia a la pagina que se le introduzca
   * @param num El numero de la pagina a la que vamos a cambiar
   */
  async changePage(num: number) {
    this.loadingservice.show();
    this.actualpage = num;
    this.getGamesNotVerified();
    this.loadingservice.hide();
  }

  async getGamesNotVerified() {
    try {
      this.gamelist = await this.gameservice.getGamesNotVerified(this.actualpage, this.gamesperpage);
    } catch (error) {

    }
  }

  async verifyGame(game: Game, index: number) {
    
    try {
      if (await this.alertservice.showConfirmAlert("¿Estás seguro de que quieres verificar el juego?")) {
        this.loadingservice.show();
        let email = await this.gameservice.getPublisherByGameId(game.id);
        let emailissended = await this.sendemail(email, "El juego ha sido verificado", `Tu juego ${game.name} ha sido verificado correctamente`);
        if (emailissended) {
          let aux = await this.gameservice.setGameVerified(game.id);
          this.loadingservice.hide();
          if (aux) {
            this.gamelist.splice(index, 1);
            this.alertservice.showSuccessMessage(`El juego ${game.name} se ha verificado correctamente`);
          } else {
            this.alertservice.showErrorMessage("Error al verificar el juego");
          }
        } else {
          this.alertservice.showErrorMessage("Error al enviar el correo electrónico");
        }
      }
    } catch (error) {

    }
  }

  async sendemail(toEmail: string, subject: string, body: string) {
    try {
      return await this.emailservice.sendEmail(toEmail, subject, body);
    } catch (error) {
      return false;
    }
  }


  async rejectVerfiedGame(game: Game, index: number) {
    try {
      if (await this.alertservice.showConfirmAlert("¿Estás seguro de que quieres rechazar el juego?")) {
        let motivo = await this.alertservice.showSendEmailAlert();
        if (motivo != "" && motivo != null) {
          let email = await this.gameservice.getPublisherByGameId(game.id);
          this.loadingservice.show();
          let emailissended = await this.sendemail(email, `Tu juego ${game.name} ha sido rechazado`, `Por el siguiente motivo: ${motivo}`);
          if (emailissended) {
            let aux = await this.gameservice.setGameVerifiedNull(game.id);
            this.loadingservice.hide();
            if (aux) {
              this.gamelist.splice(index, 1);
              this.alertservice.showSuccessMessage("El juego se ha rechazado correctamente");
            } else {
              this.alertservice.showErrorMessage("Error al rechazar el juego");
            }
          }  else {
            this.alertservice.showErrorMessage("Error al enviar el correo electrónico");
          }
        } else {
          this.alertservice.showErrorMessage("Debes introducir algún motivo por el que rechazar el juego");
        }
      }
    } catch (error) {

    }
  }
}
