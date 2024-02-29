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
            showOne: new FormControl(true),
            metric: new FormControl('average', [Validators.required]),
        });
    }

    onSubmit(): void {
        this.showChart = false;
        this.activeAssessments = [];
        console.log(this.form.value);
        const { demoSite, showOne, metric } = this.form.value;

        // Logic to filter assessments based on form values
        if (showOne) {
            this.activeAssessments = this.assessments.filter((assessment) => assessment.user === this.currentUser().email);
        } else {
            const tempAssessments: IAssessment[] = this.assessments.filter((assessment) => assessment.demoSite === demoSite);
            let tempAssessments2: { [key: string]: IAssessment[] } = {};

            for (let assessment of tempAssessments) {
                let key = assessment.indicator;
                console.log(key);
                if (key !== undefined) {
                    if (tempAssessments2[key] === undefined) {
                        tempAssessments2[key] = [];
                    }
                    tempAssessments2[key].push(assessment);
                }
            }
            console.log(tempAssessments2);

            Object.keys(tempAssessments2).forEach((key) => {
                let values = tempAssessments2[key].map((assessment) => assessment.normalized_value);
                let value = 0;
                switch (metric) {
                    case 'average':
                        value = mean(values);
                        break;
                    case 'median':
                        value = median(values);
                        break;
                    case 'min':
                        value = min(values);
                        break;
                    case 'max':
                        value = max(values);
                        break;
                }
                this.activeAssessments.push({ indicator: key, normalized_value: value });
            });
        }

        // This is a workaround to make sure that the previous chart is removed before the new one is created
        setTimeout(() => {
            this.showChart = true;
        }, 1);
    }
}
