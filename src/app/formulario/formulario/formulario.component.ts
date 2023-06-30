import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  documentoEnmascarado?: string;
  documento?: string;



  encriptarNumeroDocumento() {
    const numeroDocumento = (<HTMLInputElement>document.getElementById('documento')).value;
    console.log(numeroDocumento.substring(-2));
    this.documento = numeroDocumento;
    this.documentoEnmascarado = '*****' + numeroDocumento.substring(numeroDocumento.length -2);
    // const documentoCifrado = encriptarDocumento(numeroDocumento);
    // (<HTMLInputElement>document.getElementById('documentoCifrado')).value = documentoCifrado;
  }

  update(element:string, value:string){
    (<HTMLInputElement>document.getElementById(element)).value = value;
  }

  getInputValue(event: Event):void {
    console.log(event);
    // const target = event.target as HTMLInputElement;
    


    if((event.target as HTMLInputElement).id == "nombre"){
      this.encriptarNumeroDocumento()
      if(this.documentoEnmascarado){
        this.update('documento',this.documentoEnmascarado)
      }

    }else if((event.target as HTMLInputElement).id == "documento"){
      if(this.documento){
        this.update('documento',this.documento)
      }
    }

  }

}
