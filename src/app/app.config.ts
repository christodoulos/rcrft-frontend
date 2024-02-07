import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('614939923930-8embf5o9vgr3oiq66ma72rcm36ibsuqq.apps.googleusercontent.com'),
                    },
                ],
                onError: (err: any) => {
                    console.log(err);
                },
            } as SocialAuthServiceConfig,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ],
};
