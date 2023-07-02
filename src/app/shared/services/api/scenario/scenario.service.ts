import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { CryptographyService } from '../../cryptography/cryptography.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { IMessage } from 'src/app/shared/models/i-message';
import { ModalComponent } from 'src/app/formulario/formulario/modal/modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private baseUrl: string="http://localhost:8000/escenario";
  
  constructor(
    private _http:HttpClient,
    private cryptography:CryptographyService,
    private router:Router,
    private dialog: MatDialog

    ) {  }

  setScenario(scenario:string, publicKey:string, privateKey:string){
    let encryptedScenario;
    let data = this.cryptography.encryptData(scenario, publicKey)
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
          this.cryptography.decryptData(response,privateKey).then((responseData:string)=>{
            
            let dataJson = JSON.parse(responseData)


            if(dataJson.flujo){
              this.router.navigate([`../${dataJson.flujo}`])
            }else{
                //TODO: open a modal here
                // return responseData

                this.openModal(dataJson)
            }

            
          })
        },
        error: (error) => console.log(error)
      })
      return req
    });
    return data
  }

  openModal(data: IMessage) {
    
    const dialogRef = this.dialog.open(ModalComponent,
      {
        data:{mensaje:data.mensaje, exitoso:data.exitoso},
        disableClose: true
        
      });
  }

}
