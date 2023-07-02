import { Component } from '@angular/core';
import { KeyService } from 'src/app/shared/services/api/key/key.service';
import { ScenarioService } from 'src/app/shared/services/api/scenario/scenario.service';
declare function encriptarCampo(nomVar: string, nomVarCrypto: string, visibles: any): void;


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  documentoEnmascarado?: string;
  documento?: string;
  private key: any;

  constructor(
    private keyService:KeyService,
    private scenarioService:ScenarioService
    ){  }


  encriptarNumeroDocumento() {

    const numeroDocumento = (<HTMLInputElement>document.getElementById('documento')).value;
    this.documento = numeroDocumento;
    // this.documentoEnmascarado = '*****' + numeroDocumento.substring(numeroDocumento.length -2);
    encriptarCampo('documento','documentoCifrado',2);
    //Valor de prueba
    (<HTMLInputElement>document.getElementById('documentoCifrado')).value = "XEb71fJM2qt+re9zKXjbOYkRlgn8y0jGdHYuGbuH37uwkEJHScZwlKRtw8w2cawKt0V5c3DChjPlYHS9bQb6ifcXFb6rV8Ym7slp/J0l0W0dwE3OpTcFNdLCpDZuSBoSDZKvcy0egnI9Dxn1URdQySm0Z+DPwlpzbgSeq25Gdos=";
  }

  update(element:string, value:string){
    (<HTMLInputElement>document.getElementById(element)).value = value;
  }

  getInputValue(event: Event):void {
    // const target = event.target as HTMLInputElement;

    if((event.target as HTMLInputElement).id == "nombre"){
      this.encriptarNumeroDocumento()
      if(this.documentoEnmascarado){
        // this.update('documento',this.documentoEnmascarado)
      }

    }else if((event.target as HTMLInputElement).id == "documento"){
      if(this.documento){
        this.update('documento',this.documento)
      }
    }

  }

  submitForm(event: Event): void {
    event.preventDefault(); // Prevent the default form submission

    const encrypted = (<HTMLInputElement>document.getElementById('documentoCifrado')).value;
    const name = (<HTMLInputElement>document.getElementById('nombre')).value;

    const json = `{"flujo":"Formulario","numDocumento":"${encrypted}","nombre":"${name}"}`
    this.keyService.getKeys().subscribe({
      next: (res) => {
        this.key = res;//JSON.parse(res);
        this.scenarioService.setScenario(json,  this.key.publicKey,this.key.privateKey)
        
      },
      error: err => console.log(err)
    })



    

    
  }

}
