import { Route } from '@angular/router';
import { IndicatorsComponent } from './indicators.component';
import { authGuard } from '../../shared/services/auth.guard';

export const routes: Route[] = [
    {
        path: '',
        component: IndicatorsComponent,
        canActivate: [authGuard],
    },
];
