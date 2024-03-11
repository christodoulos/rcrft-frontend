import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IIndicator } from '../../../shared/interfaces/indicator/indicator.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { IndicatorsService } from '../../../shared/services/indicators.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConstService } from '../../../shared/services/const.service';

@Component({
    selector: 'app-quantitative-min-max',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './quantitative-min-max.component.html',
    styleUrl: './quantitative-min-max.component.css',
})
export class QuantitativeMinMaxComponent {
    router = inject(Router);
    authService = inject(AuthService);
    indicatorsService = inject(IndicatorsService);
    constService = inject(ConstService);

    currentUser = this.authService.user;
    indicator: IIndicator;

    form: FormGroup;

    constructor() {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation.extras.state as { indicator: IIndicator };
        this.indicator = state.indicator;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            value: new FormControl('', [Validators.required, Validators.pattern(this.constService.NUMBER_REGEX)]),
            minValue: new FormControl('', [Validators.required, Validators.pattern(this.constService.NUMBER_REGEX)]),
            maxValue: new FormControl('', [Validators.required, Validators.pattern(this.constService.NUMBER_REGEX)]),
            isInverse: new FormControl(false),
            alternativeTitle: new FormControl(''),
            degreeOfCertainty: new FormControl(),
            indicatorWeight: new FormControl(),
        });
    }

    onSubmit(): void {
        const data = {
            formType: 'quantitative-min-max',
            description: this.indicator.description,
            value: this.form.value.value,
            minValue: this.form.value.minValue,
            maxValue: this.form.value.maxValue,
            isInverse: this.form.value.isInverse,
            alternativeTitle: this.form.value.alternativeTitle,
            normalizedValue: null,
            degreeOfCertainty: ((this.form.value.degreeOfCertainty - 1) * 5) / 4,
            indicatorWeight: this.form.value.indicatorWeight / 5,
        };

        if (data.isInverse) {
            data.normalizedValue = 1 - (data.value - data.minValue) / (data.maxValue - data.minValue);
        } else {
            data.normalizedValue = (data.value - data.minValue) / (data.maxValue - data.minValue);
        }

        data.normalizedValue = data.normalizedValue * 5; // rescale the normalized value to the range [0, 5]

        this.indicatorsService.newAssessment(data).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/indicators']);
        });
    }
}
