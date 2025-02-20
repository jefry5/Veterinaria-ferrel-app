import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagosPagesComponent } from './pagos-pages/pagos-pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagosPagesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}
