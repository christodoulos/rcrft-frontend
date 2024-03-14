import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IIndicator } from '../../../shared/interfaces/indicator/indicator.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { IndicatorsService } from '../../../shared/services/indicators.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConstService } from '../../../shared/services/const.service';
@Component({
    selector: 'app-quantitative-reference',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './quantitative-reference.component.html',
    styleUrl: './quantitative-reference.component.css',
})
export class QuantitativeReferenceComponent {
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
            referenceValue: new FormControl('', [Validators.required, Validators.pattern(this.constService.NUMBER_REGEX)]),
            isInverse: new FormControl(false),
            alternativeTitle: new FormControl(''),
            degreeOfCertainty: new FormControl<number>(3),
            indicatorWeight: new FormControl<number>(1),
        });
    }

    onSubmit(): void {
        const data = {
            formType: 'quantitative-reference',
            description: this.indicator.description,
            value: parseFloat(this.form.value.value),
            referenceValue: parseFloat(this.form.value.referenceValue),
            isInverse: this.form.value.isInverse,
            alternativeTitle: this.form.value.alternativeTitle,
            normalizedValue: null,
            degreeOfCertainty: ((this.form.value.degreeOfCertainty - 1) * 5) / 4,
            indicatorWeight: this.form.value.indicatorWeight / 5,
        };

        if (data.isInverse) {
            data.normalizedValue = 5 - (data.value / data.referenceValue) * 5;
        } else {
            data.normalizedValue = (data.value / data.referenceValue) * 5;
        }

        this.indicatorsService.newAssessment(data).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/indicators']);
        });
    }
}
