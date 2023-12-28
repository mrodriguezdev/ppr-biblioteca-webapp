import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Guarda datos en el almacenamiento local con la clave especificada.
   * @param key La clave bajo la cual se almacenarán los datos.
   * @param data Los datos que se almacenarán en el almacenamiento local.
   */
  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Recupera datos del almacenamiento local basándose en la clave especificada.
   * @param key La clave asociada con los datos que se van a recuperar.
   * @returns Los datos recuperados como objeto. Si no se encuentran datos, devuelve null.
   */
  getData(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * Elimina datos del almacenamiento local basándose en la clave especificada.
   * @param key La clave asociada con los datos que se van a eliminar.
   */
  removeData(key: string) {
    localStorage.removeItem(key);
  }

}
