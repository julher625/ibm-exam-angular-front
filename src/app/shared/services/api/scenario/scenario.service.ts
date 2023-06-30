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

  setScenario(scenario:string, jsonKey:string){
    let encryptedScenario;
    this.cryptography.encryptData(scenario, jsonKey)
    .then((data:string)=>{
      encryptedScenario = data;
      const json = {
        escenario: encryptedScenario
      };
      const req = this._http.post<string>(
        this.baseUrl,
        json
        ).subscribe({
        next: (response) => {
          this.cryptography.decryptData(response,jsonKey).then((data:string)=>{
            let dataJson = JSON.parse(data)
            this.router.navigate([`../${dataJson.flujo}`])
          })
        },
        error: (error) => console.log(error)
      })
    });
  }
}
