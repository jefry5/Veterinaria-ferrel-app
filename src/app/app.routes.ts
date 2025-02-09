import { Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from '@modules/home/home.module';
import { authGuard } from '@core/guards/auth/auth.guard';
import { MascotasModule } from '@modules/veterinario-role/mascotas/mascotas.module';
import { HistoriasMedicasModule } from '@modules/veterinario-role/historias-medicas/historias-medicas.module';
import { ClientesModule } from '@modules/recepcionista-role/clientes/clientes.module';
import { PagosModule } from '@modules/recepcionista-role/pagos/pagos.module';

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
        path: 'clientes',
        loadChildren: () => ClientesModule,
        canActivate: [authGuard],
    },
    {
        path: 'pagos',
        loadChildren: () => PagosModule,
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
    }
];
