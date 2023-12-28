import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  /**
   * Muestra una notificación de éxito.
   * @param title Título que se mostrará en la notificación.
   */
  showSuccessNotification(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  /**
   * Muestra una notificación de error.
   * @param title Título que se mostrará en la notificación.
   */
  showErrorNotification(title: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 2000,
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
}
