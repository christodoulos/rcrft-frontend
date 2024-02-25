import { Component, Input } from '@angular/core';
import { IIndicator } from '../../../interfaces/indicator/indicator.interface';

@Component({
    selector: 'app-indicator-details',
    standalone: true,
    imports: [],
    templateUrl: './indicator-details.component.html',
    styleUrl: './indicator-details.component.css',
})
export class IndicatorDetailsComponent {
    @Input() indicator: IIndicator | null = null;

    onClose() {
        // Destroy the component
    }
}
