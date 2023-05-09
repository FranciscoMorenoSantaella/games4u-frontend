import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Método para mostrar una alerta de éxito
  showSuccessMessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message
    });
  }

  // Método para mostrar una alerta de error
  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: message
    });
  }

  // Método para mostrar una alerta de información
  showInfoMessage(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message
    });
  }

  showConfirmAlert(message: string): Promise<boolean> {
    return Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return result.isConfirmed; // Devuelve true si el usuario hizo clic en "Aceptar", false si hizo clic en "Cancelar" o cerró la alerta
    });
  }

  showSendEmailAlert():Promise<string> {
    // Crear una nueva promesa
    return new Promise((resolve) => {
      // Mostrar una alerta con un campo de entrada
      Swal.fire({
        title: 'Motivo por el que se rechaza el juego',
        input: 'text',
        inputPlaceholder: 'Escribe el motivo',
      }).then((result) => {
        // result.value contendrá el valor ingresado por el usuario
        const motivo = result.value;
        // Resolver la promesa con el valor ingresado
        resolve(motivo);
      });
    });
  }



}
