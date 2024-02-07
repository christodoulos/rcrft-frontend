import { Injectable, inject, signal } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    socialAuthService = inject(SocialAuthService);
    http = inject(HttpClient);

    user = signal(<SocialUser | null>null);

    constructor() {
        this.socialAuthService.authState.subscribe(
            (user) => {
                if (user) {
                    const { idToken } = user;
                    this.http
                        .post<{ accessToken: string }>(`${environment.apiUrl}/auth/google-auth`, {
                            idToken,
                        })
                        .subscribe({
                            next: (res) => {
                                this.user.set(user);
                                localStorage.setItem('accessToken', res.accessToken);
                            },
                            error: (err) => {
                                console.log(err);
                            },
                        });
                }
            },
            (err) => {
                console.log('!!!!!!!!!!!!!!!!!!!1');
                console.log(err);
            }
        );
    }

    signOut() {
        this.socialAuthService.signOut();
        this.user.set(null);
        localStorage.removeItem('accessToken');
    }
}
