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

    console.log(publicKey.replace("\r\n",""));
    this.cryptography.encryptData(scenario, publicKey.replace("\r\n",""))
    .then((data:string)=>{
      encryptedScenario = data;
      const json = {
        escenario: encryptedScenario
      };
      console.log(json);
      const req = this._http.post<string>(
        this.baseUrl,
        json
        ).subscribe({
        next: (response) => {
          console.log("================================")

          console.log(response)
          this.cryptography.decryptData(response,privateKey).then((responseData:string)=>{
            
            let dataJson = JSON.parse(responseData)
            console.log("================================")
            console.log(scenario);
            console.log(dataJson)
            console.log(response);
            console.log("================================")
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
