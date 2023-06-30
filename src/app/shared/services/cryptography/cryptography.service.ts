import { Injectable } from '@angular/core';
import * as jose from 'node-jose';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  constructor() { }

  async encryptData(plaintext: string, jsonKey: string): Promise<string> {
    try {
      const key = await jose.JWK.asKey(jsonKey);

      const encryptor = jose.JWE.createEncrypt({ format: 'compact', contentAlg: 'A256CBC-HS512' }, key);
      // const encryptedData = await encryptor.update(plaintext);
      let res = encryptor.update(plaintext).final().then((result)=>{
        return result.toString();
      })

      return res;

      
    } catch (error) {
      console.error('Error occurred during data encryption:', error);
      throw error;
    }
  }

  async decryptData(encryptedData: string, jsonKey: string): Promise<string> {
    try {
      
      const key = await jose.JWK.asKey(jsonKey);
      const decryptor = jose.JWE.createDecrypt(key);


      //TODO: Fix the decrypt
      
      // const result = await decryptor.decrypt(encryptedData)
      // .then((result)=>{
      //   console.log(result);
      //   return result.toString()
      // });

      // return result.toString();
      return '{"flujo":"Formulario"}'
    } catch (error) {
      console.error('Error occurred during data decryption:', error);
      throw error;
    }
  
  }
}
