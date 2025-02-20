import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockPageComponent } from './stock-page/stock-page.component';

const routes: Routes = [
  { path: '', 
    component: StockPageComponent 
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
export class StockRoutingModule { }
