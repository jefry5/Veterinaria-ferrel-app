import { Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { LoadingPageComponent } from '@shared/components/loading-page/loading-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => AuthModule,
    }
];
