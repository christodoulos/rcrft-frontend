import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-backend-messages',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './backend-messages.component.html',
    styleUrl: './backend-messages.component.css',
})
export class BackendMessagesComponent {
    @Input() message: string | null;

    onClose() {
        this.message = null;
    }
}
