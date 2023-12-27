import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localstorage/local-storage.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureLocalStorageService {

  constructor(
    private localStorageService: LocalStorageService,
    private encryptionService: EncryptionService
  ) { }

  /**
   * Guarda datos encriptados en el almacenamiento local con la clave especificada.
   * @param key La clave bajo la cual se almacenarán los datos encriptados.
   * @param data Los datos que se encriptarán y guardarán en el almacenamiento local.
   */
  saveEncryptedData(key: string, data: any) {
    const encryptedData = this.encryptionService.encrypt(data);
    this.localStorageService.saveData(key, encryptedData);
  }

  /**
   * Recupera y desencripta datos del almacenamiento local basándose en la clave especificada.
   * @param key La clave asociada con los datos encriptados que se van a recuperar y desencriptar.
   * @returns Los datos desencriptados como objeto. Si no se encuentran datos, devuelve null.
   */
  getDecryptedData(key: string): any {
    const encryptedData = this.localStorageService.getData(key);
    if (encryptedData) {
      return this.encryptionService.decrypt(encryptedData);
    }
    return null;
  }

}
