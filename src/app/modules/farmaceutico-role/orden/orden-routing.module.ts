import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenPageComponent } from './orden-page/orden-page.component';

const routes: Routes = [
  { path: '', 
    component: OrdenPageComponent 
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
export class OrdenRoutingModule { }
