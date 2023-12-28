import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  /**
   * Muestra una notificación de éxito.
   * @param text Mensaje que se mostrará en la notificación.
   */
  showSuccessNotification(text: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: text,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  /**
   * Muestra una notificación de error.
   * @param text Mensaje que se mostrará en la notificación.
   */
  showErrorNotification(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops..',
      text: text,
      showConfirmButton: true,
      footer: 'Comunícate con nuestro soporte técnico para obtener ayuda.',
      timer: 2500,
    });
  }

  /**
   * Muestra una notificación de carga.
   * @param title Título que se mostrará en la notificación.
   */
  showLoadNotification(title: string) {
    const swalWithLoading = Swal.mixin({
      title: title,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    swalWithLoading.fire();
  }

  /**
   * Cierra una notificación sin importar cuál sea.
   */
  hideAlert() {
    Swal.close();
  }
}
