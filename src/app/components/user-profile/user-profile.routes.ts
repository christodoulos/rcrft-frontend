import { Route } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { authGuard } from '../../shared/services/auth.guard';

export const routes: Route[] = [
    {
        path: '',
        component: UserProfileComponent,
        canActivate: [authGuard],
    },
];
