import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { take } from 'rxjs';
import { SpiderChartComponent } from '../../shared/components/spider-chart/spider-chart.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConstService } from '../../shared/services/const.service';
import { AuthService } from '../../shared/services/auth.service';
import { mean, median, min, max } from 'mathjs';

@Component({
    selector: 'app-assessments',
    standalone: true,
    imports: [CommonModule, DataTablesModule, RouterLink, SpiderChartComponent, ReactiveFormsModule],
    templateUrl: './assessments.component.html',
    styleUrl: './assessments.component.css',
})
export class AssessmentsComponent implements OnInit {
    indicatorsService = inject(IndicatorsService);
    constService = inject(ConstService);
    authService = inject(AuthService);

    currentUser = this.authService.user;
    demoSites = this.constService.DEMO_SITES;
    stakeHolderTypes = this.constService.StakeHolderTypes;

    resilienceScore: number = -1;
    form: FormGroup;
    assessments: IAssessment[] = [];
    activeAssessments: Partial<IAssessment>[] = [];
    showChart = false;
    dtOptions: DataTables.Settings = {
        responsive: true,
        processing: true,
    };
    isLoading = true;

    ngOnInit(): void {
        this.indicatorsService
            .getAllAssessments()
            .pipe(take(1))
            .subscribe((assessments: IAssessment[]) => {
                this.assessments = assessments;
                this.isLoading = false;
            });

        this.form = new FormGroup({
            demoSite: new FormControl(this.currentUser().demoSite, [Validators.required]),
            stakeHolderType: new FormControl('anyStakeholderType', [Validators.required]),
            showOne: new FormControl(true),
            metric: new FormControl('average', [Validators.required]),
        });
    }

    onSubmit(): void {
        this.resilienceScore = -1;

        this.showChart = false;
        this.activeAssessments = [];
        const { demoSite, stakeHolderType, showOne, metric } = this.form.value;

        // Logic to filter assessments based on form values
        if (showOne) {
            this.activeAssessments = this.assessments.filter((assessment) => assessment.user === this.currentUser().email);
            let resilienceScoreSum = 0;
            let resilienceScoreTotalWeight = 0;
            this.assessments.forEach((assessment) => {
                if (assessment.user === this.currentUser().email) {
                    resilienceScoreSum += assessment.normalized_value * assessment.indicatorWeight;
                    resilienceScoreTotalWeight += assessment.indicatorWeight;
                }
            });
            this.resilienceScore = resilienceScoreSum / resilienceScoreTotalWeight;
        } else {
            let tempAssessments: IAssessment[] = [];

            if (stakeHolderType === 'anyStakeholderType') {
                tempAssessments = this.assessments.filter((assessment) => assessment.demoSite === demoSite);
            } else {
                tempAssessments = this.assessments.filter(
                    (assessment) => assessment.demoSite === demoSite && assessment.stakeHolderType === stakeHolderType
                );
            }

            let tempAssessments2: { [key: string]: IAssessment[] } = {};

            for (let assessment of tempAssessments) {
                let key = assessment.indicator;
                if (key !== undefined) {
                    if (tempAssessments2[key] === undefined) {
                        tempAssessments2[key] = [];
                    }
                    tempAssessments2[key].push(assessment);
                }
            }

            if (metric === 'average') {
                let resilienceScoreArray: Object[] = [];

                Object.keys(tempAssessments2).forEach((key) => {
                    const indicatorValue: number = mean(tempAssessments2[key].map((assessment: IAssessment) => assessment.normalized_value));
                    const indicatorWeight: number = mean(tempAssessments2[key].map((assessment: IAssessment) => assessment.indicatorWeight));

                    resilienceScoreArray.push({
                        indicator: key,
                        normalized_value: indicatorValue,
                        indicatorWeight: indicatorWeight,
                    });
                });

                let resilienceScoreSum = 0;
                let resilienceScoreTotalWeight = 0;
                resilienceScoreArray.forEach((assessment) => {
                    resilienceScoreSum += assessment['normalized_value'] * assessment['indicatorWeight'];
                    resilienceScoreTotalWeight += assessment['indicatorWeight'];
                });
                this.resilienceScore = resilienceScoreSum / resilienceScoreTotalWeight;
            }

            Object.keys(tempAssessments2).forEach((key) => {
                let values = tempAssessments2[key].map((assessment: IAssessment) => assessment.normalized_value);
                let certaintyValues = tempAssessments2[key].map((assessment) => assessment.degreeOfCertainty);

                let certaintyValue = 0;
                let value: number;

                switch (metric) {
                    case 'average':
                        value = mean(values);
                        certaintyValue = mean(certaintyValues);
                        break;
                    case 'median':
                        value = median(values);
                        certaintyValue = median(certaintyValues);
                        break;
                    case 'min':
                        value = min(values);
                        certaintyValue = min(certaintyValues);
                        break;
                    case 'max':
                        value = max(values);
                        certaintyValue = max(certaintyValues);
                        break;
                }

                let is_inverseValues = tempAssessments2[key].map((assessment) => assessment.is_inverse);
                let is_inverse = is_inverseValues.includes(true);
                let alternative_description = '';
                if (is_inverse) {
                    let alternative_descriptions = tempAssessments2[key].map((assessment) => assessment.alternative_description);
                    alternative_description = alternative_descriptions.filter((description) => description !== '')[0];
                }

                this.activeAssessments.push({
                    indicator: key,
                    normalized_value: value,
                    degreeOfCertainty: certaintyValue,
                    is_inverse: is_inverse,
                    alternative_description: alternative_description,
                });
            });
        }

        // This is a workaround to make sure that the previous chart is removed before the new one is created
        setTimeout(() => {
            this.showChart = true;
        }, 1);
    }

    printResilienceScore(score: number): string {
        if (score === -1 || isNaN(score)) {
            return '-';
        } else {
            return score.toFixed(3);
        }
    }
}
