import { Component, effect, inject } from '@angular/core';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [GoogleSigninButtonModule, RouterLink, CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    authService = inject(AuthService);
    currentUser = this.authService.user;

    constructor() {
        effect(() => {
            console.log(this.currentUser());
        });
    }

    signOut() {
        this.authService.signOut();
    }
}
