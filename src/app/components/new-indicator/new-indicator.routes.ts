import { Route } from '@angular/router';
import { authGuard } from '../../shared/services/auth.guard';
import { NewIndicatorComponent } from './new-indicator.component';

export const routes: Route[] = [
    {
        path: '',
        component: NewIndicatorComponent,
        canActivate: [authGuard],
    },
];
