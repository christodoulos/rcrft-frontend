import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IIndicator } from '../../../shared/interfaces/indicator/indicator.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { IndicatorsService } from '../../../shared/services/indicators.service';

@Component({
    selector: 'app-qualitative',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './qualitative.component.html',
    styleUrl: './qualitative.component.css',
})
export class QualitativeComponent implements OnInit {
    router = inject(Router);
    authService = inject(AuthService);
    indicatorsService = inject(IndicatorsService);

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
            normalizedValue: new FormControl(),
        });
    }

    onSubmit(): void {
        const data = {
            formType: 'qualitative',
            description: this.indicator.description,
            normalizedValue: this.form.value.normalizedValue,
        };

        this.indicatorsService.newAssessment(data).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/indicators']);
        });
    }
}
