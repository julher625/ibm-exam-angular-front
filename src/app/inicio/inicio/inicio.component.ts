import { Component } from '@angular/core';
import { CryptographyService } from 'src/app/shared/services/cryptography/cryptography.service';
import { KeyService } from 'src/app/shared/services/api/key/key.service';
import { ScenarioService } from 'src/app/shared/services/api/scenario/scenario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  private key: any

  constructor(
    public cryptographyService:CryptographyService,
    private keyService:KeyService,
    private scenarioService:ScenarioService
    ){}

  ngOnInit(): void{

    this.keyService.getKeys().subscribe({
      next: (res) => {
        this.key = res;//JSON.parse(res);
        this.scenarioService.setScenario('{"flujo":"inicio"}', this.key.publicKey,this.key.privateKey)
      },
      error: err => console.log(err)
    })

  }

}
