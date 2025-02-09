import { Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from '@modules/home/home.module';
import { authGuard } from '@core/guards/auth/auth.guard';
import { MascotasModule } from '@modules/veterinario-role/mascotas/mascotas.module';
import { HistoriasMedicasModule } from '@modules/veterinario-role/historias-medicas/historias-medicas.module';
import { StockModule } from '@modules/farmaceutico-role/stock/stock.module';
import { OrdenModule } from '@modules/farmaceutico-role/orden/orden.module';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => AuthModule,
    },
    {
        path: 'home',
        loadChildren: () => HomeModule,
        canActivate: [authGuard],
    },
    {
        path: 'mascotas',
        loadChildren: () => MascotasModule,
        canActivate: [authGuard],
    },
    {
        path: 'historias',
        loadChildren: () => HistoriasMedicasModule,
        canActivate: [authGuard],
    },
    {
        path: 'stock',
        loadChildren: () => StockModule,
        canActivate: [authGuard],
    },
    {
        path: 'orden',
        loadChildren: () => OrdenModule,
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
    }
];
