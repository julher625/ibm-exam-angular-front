import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { mensaje: string,exitoso: boolean},
  public dialogRef: MatDialogRef<ModalComponent>
  ) {}


  ngOnInit() {

  }

  closeDialog() {
    (<HTMLInputElement>document.getElementById('nombre')).value = "";
    (<HTMLInputElement>document.getElementById('documento')).value = "";
    this.dialogRef.close();
  }
}
