import { Route } from '@angular/router';
import { QuantitativeMinMaxComponent } from './quantitative-min-max.component';
import { authGuard } from '../../../shared/services/auth.guard';

export const routes: Route[] = [
    {
        path: '',
        component: QuantitativeMinMaxComponent,
        canActivate: [authGuard],
    },
];
