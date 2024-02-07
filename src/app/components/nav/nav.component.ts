import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [CommonModule, RouterLinkActive, RouterLink],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
})
export class NavComponent {
    authService = inject(AuthService);
    currentUser = this.authService.user;

    onLogout() {
        this.authService.signOut();
    }
}
