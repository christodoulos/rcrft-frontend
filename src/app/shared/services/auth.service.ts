import { Injectable, inject, signal } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { IAuthResponse } from '../interfaces/auth/authResponse.interface';
import { IUser } from '../interfaces/auth/user.interface';
import { IProfileUpdateRequest } from '../interfaces/profile/profileUpdateRequest.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    socialAuthService = inject(SocialAuthService);
    http = inject(HttpClient);
    router = inject(Router);

    user = signal(<IUser | null>null);

    constructor() {
        this.socialAuthService.authState.subscribe(
            (user) => {
                if (user) {
                    const { idToken } = user;
                    this.http
                        .post<IAuthResponse>(`${environment.apiUrl}/auth/google-auth`, {
                            idToken,
                        })
                        .subscribe({
                            next: (res: IAuthResponse) => {
                                this.user.set(res.user);
                                localStorage.setItem('accessToken', res.accessToken);
                                this.router.navigate(['/indicators']);
                            },
                            error: (err) => {
                                console.log(err);
                            },
                        });
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    signOut() {
        this.socialAuthService.signOut();
        this.user.set(null);
        localStorage.removeItem('accessToken');
    }

    updateProfile(req: IProfileUpdateRequest) {
        const apiUrl = `${environment.apiUrl}/auth/profile`;
        return this.http.patch<{ msg: string }>(apiUrl, req);
    }

    getAllUsers() {
        const apiUrl = `${environment.apiUrl}/auth/users`;
        return this.http.get<IUser[]>(apiUrl);
    }
}
