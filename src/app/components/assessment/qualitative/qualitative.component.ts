import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IIndicator } from '../../../shared/interfaces/indicator/indicator.interface';

@Component({
    selector: 'app-qualitative',
    standalone: true,
    imports: [],
    templateUrl: './qualitative.component.html',
    styleUrl: './qualitative.component.css',
})
export class QualitativeComponent implements OnInit {
    router = inject(Router);

    constructor() {
        const navigation = this.router.getCurrentNavigation();
        console.log(navigation);
        const state = navigation.extras.state as { indicator: IIndicator };
        console.log(state.indicator);
    }

    ngOnInit(): void {}
}
