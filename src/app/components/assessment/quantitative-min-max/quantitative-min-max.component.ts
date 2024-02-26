import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IIndicator } from '../../../shared/interfaces/indicator/indicator.interface';

@Component({
    selector: 'app-quantitative-min-max',
    standalone: true,
    imports: [],
    templateUrl: './quantitative-min-max.component.html',
    styleUrl: './quantitative-min-max.component.css',
})
export class QuantitativeMinMaxComponent {
    router = inject(Router);
    indicator: IIndicator;

    constructor() {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { indicator: IIndicator };
        this.indicator = state.indicator;
    }
}
