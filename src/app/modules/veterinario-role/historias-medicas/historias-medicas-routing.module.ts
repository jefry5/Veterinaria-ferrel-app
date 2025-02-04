import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriasMedicasPageComponent } from './historias-medicas-page/historias-medicas-page.component';

const routes: Routes = [
  {
    path: '',
    component: HistoriasMedicasPageComponent,
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
export class HistoriasMedicasRoutingModule { }
