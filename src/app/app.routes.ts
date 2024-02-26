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
    {
        path: 'new-indicator',
        loadChildren: () => import('./components/new-indicator/new-indicator.routes').then((m) => m.routes),
    },
    {
        path: 'assess/quantitative/reference',
        loadChildren: () => import('./components/assessment/quantitative-reference/quantitative-reference.routes').then((m) => m.routes),
    },
    {
        path: 'assess/quantitative/min-max',
        loadChildren: () => import('./components/assessment/quantitative-min-max/quantitative-min-max.routes').then((m) => m.routes),
    },
    {
        path: 'assess/qualitative',
        loadChildren: () => import('./components/assessment/qualitative/qualitative.routes').then((m) => m.routes),
    },
    {
        path: 'assessments',
        loadChildren: () => import('./components/assessments/assessments.routes').then((m) => m.routes),
    },
];
