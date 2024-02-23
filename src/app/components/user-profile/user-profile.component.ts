import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConstService } from '../../shared/services/const.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { IProfileUpdateRequest } from '../../shared/interfaces/profile/profileUpdateRequest.interface';
import { BackendMessagesComponent } from '../../shared/components/backend-messages/backend-messages.component';
import { IUser } from '../../shared/interfaces/auth/user.interface';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, BackendMessagesComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
    constService = inject(ConstService);
    authService = inject(AuthService);
    currentUser = this.authService.user;
    backendMessage: string | null = null;

    form: FormGroup;
    demoSites = this.constService.DEMO_SITES;

    ngOnInit(): void {
        this.form = new FormGroup({
            demoSite: new FormControl(this.currentUser().demoSite, [Validators.required]),
        });
    }

    onSubmit(): void {
        this.backendMessage = null;
        const data: IProfileUpdateRequest = this.form.value;
        this.authService.updateProfile(data).subscribe({
            next: (res: { msg: string; user: IUser }) => {
                this.authService.user.set(res.user);
                this.backendMessage = res.msg;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
