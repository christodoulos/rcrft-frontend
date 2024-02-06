import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'indicators',
        pathMatch: 'full',
    },
    {
        path: 'indicators',
        loadChildren: () => import('./components/indicators/indicators.routes').then((m) => m.routes),
    },
];
