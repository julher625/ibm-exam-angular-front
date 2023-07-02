import { Injectable } from '@angular/core';
import * as jose from 'node-jose';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  constructor() { }
  private keystore = jose.JWK.createKeyStore();

  async encryptData(plaintext: string, jsonKey: string): Promise<string> {
    try {

      console.log(jsonKey)
      console.log(plaintext)


      const key = await jose.JWK.asKey(jsonKey,"pem");
      const encryptor = jose.JWE.createEncrypt({ format: 'compact', contentAlg: 'A256CBC-HS512' }, key);
      // const encryptedData = await encryptor.update(plaintext);
      let res = encryptor.update(plaintext).final().then((result)=>{
        console.log(result)
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



      

      // console.log("****************")


      //TODO: Fix the decrypt

      const key = await jose.JWK.asKey(jsonKey,"pem").then((key) => {        
        const decryptor = jose.JWE.createDecrypt(key);
        console.log(encryptedData)
        const result = decryptor.decrypt(encryptedData)
        .then((result)=>{
          console.log(result);
          return result.toString()
        });
      }).then((res)=>{
        return res;
      })
      
      

      return '{"flujo":"Formulario"}'
    } catch (error) {
      console.error('Error occurred during data decryption:', error);
      throw error;
    }
  
  }
}
