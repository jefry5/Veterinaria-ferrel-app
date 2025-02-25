import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasPageComponent } from './mascotas-page/mascotas-page.component';

const routes: Routes = [
  {
    path: '',
    component: MascotasPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
