import { Route } from '@angular/router';
import { authGuard } from '../../shared/services/auth.guard';
import { AssessmentsComponent } from './assessments.component';

export const routes: Route[] = [
    {
        path: '',
        component: AssessmentsComponent,
        canActivate: [authGuard],
    },
];
