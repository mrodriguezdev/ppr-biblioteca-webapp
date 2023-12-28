import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly secretKey = environment.encryptKey;

  constructor() { }

  /**
   * Encripta los datos proporcionados utilizando el algoritmo AES.
   * @param data Los datos que se van a encriptar.
   * @returns Una cadena de texto que representa los datos encriptados.
   */
  encrypt(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey
    ).toString();
    return encryptedData;
  }

  /**
   * Desencripta los datos encriptados utilizando el algoritmo AES.
   * @param encryptedData La cadena de texto que representa los datos encriptados.
   * @returns Los datos desencriptados como objeto. Si la desencriptación falla, devuelve null.
   */
  decrypt(encryptedData: string): any {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    if (decryptedData) {
      return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    }
    return null;
  }
}
