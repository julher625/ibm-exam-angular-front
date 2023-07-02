import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { CryptographyService } from '../../cryptography/cryptography.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private baseUrl: string="http://localhost:8000/escenario";
  

  constructor(
    private _http:HttpClient,
    private cryptography:CryptographyService,
    private router:Router
    ) {  }

  setScenario(scenario:string, publicKey:string, privateKey:string){
    let encryptedScenario;

    this.cryptography.encryptData(scenario, publicKey)
    .then((data:string)=>{
      encryptedScenario = data;
      const json = {
        escenario: encryptedScenario
      };

      const keys = {
        publicKey: publicKey,
        privateKey: privateKey
      }
      const req = this._http.post<string>(
        this.baseUrl,
        json
        ).subscribe({
        next: (response) => {
          this.cryptography.decryptData(response,privateKey).then((responseData:string)=>{
            
            console.log(responseData)
            let dataJson = JSON.parse(responseData)

            console.log(dataJson);
            if(dataJson.flujo){
              this.router.navigate([`../${dataJson.flujo}`])
            }else{
              console.log(dataJson)
              console.log("***************************************")
            }

            
          })
        },
        error: (error) => console.log(error)
      })
    });
  }
}
