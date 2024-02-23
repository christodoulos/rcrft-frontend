import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'indicators',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./components/home/home.routes').then((m) => m.routes),
    },
    {
        path: 'profile',
        loadChildren: () => import('./components/user-profile/user-profile.routes').then((m) => m.routes),
    },
    {
        path: 'indicators',
        loadChildren: () => import('./components/indicators/indicators.routes').then((m) => m.routes),
    },
];
