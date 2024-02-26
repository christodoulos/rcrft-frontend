import { Route } from '@angular/router';
import { QuantitativeReferenceComponent } from './quantitative-reference.component';
import { authGuard } from '../../../shared/services/auth.guard';

export const routes: Route[] = [
    {
        path: '',
        component: QuantitativeReferenceComponent,
        canActivate: [authGuard],
    },
];
