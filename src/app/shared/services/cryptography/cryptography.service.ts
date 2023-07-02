import { Injectable } from '@angular/core';
import * as jose from 'node-jose';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  constructor() { }

  async encryptData(plaintext: string, jsonKey: string): Promise<string> {
    try {

      const key = await jose.JWK.asKey(jsonKey,"pem");
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

      const decrypted = await jose.JWK.asKey(jsonKey,"pem").then((key) => {        
        const decryptor = jose.JWE.createDecrypt(key);
        const result = decryptor.decrypt(encryptedData)
        .then((result)=>{
          return result.plaintext.toString('utf8');
        });
        return result;
      }).then((res)=>{
        return res;
      })
      

      return decrypted
    } catch (error) {
      console.error('Error occurred during data decryption:', error);
      throw error;
    }
  
  }
}
