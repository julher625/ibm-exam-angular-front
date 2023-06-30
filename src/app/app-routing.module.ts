import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';

const routes: Routes = [
  { path: "inicio", component: InicioComponent},
  { path: "Formulario", component: FormularioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
