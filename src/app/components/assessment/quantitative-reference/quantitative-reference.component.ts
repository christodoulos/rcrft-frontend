import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IIndicator } from '../../../shared/interfaces/indicator/indicator.interface';

@Component({
    selector: 'app-quantitative-reference',
    standalone: true,
    imports: [],
    templateUrl: './quantitative-reference.component.html',
    styleUrl: './quantitative-reference.component.css',
})
export class QuantitativeReferenceComponent {
    router = inject(Router);
    indicator: IIndicator;

    constructor() {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { indicator: IIndicator };
        this.indicator = state.indicator;
    }
}
