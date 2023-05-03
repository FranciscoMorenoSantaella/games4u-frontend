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
  
}
  