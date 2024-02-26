import { Route } from '@angular/router';
import { authGuard } from '../../../shared/services/auth.guard';
import { QualitativeComponent } from './qualitative.component';

export const routes: Route[] = [
    {
        path: '',
        component: QualitativeComponent,
        canActivate: [authGuard],
    },
];
