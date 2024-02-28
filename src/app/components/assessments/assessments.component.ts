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

    ngOnInit(): void {
        this.indicatorsService
            .getAllAssessments()
            .pipe(take(1))
            .subscribe((assessments: IAssessment[]) => {
                this.assessments = assessments;
            });

        this.form = new FormGroup({
            demoSite: new FormControl(this.currentUser().demoSite, [Validators.required]),
            showOne: new FormControl(false),
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
            const tempAssessments2: { [key: string]: any } = {};

            tempAssessments.forEach((assessment) => {
                const indicatorName = assessment.indicator;
                if (!(assessment.indicator in tempAssessments2)) {
                    tempAssessments2[indicatorName] = [assessment];
                } else {
                    tempAssessments2[indicatorName].push(assessment);
                }
            });

            Object.keys(tempAssessments2).forEach((key) => {
                tempAssessments2[key] = tempAssessments2[key].forEach((assessment: IAssessment) => assessment.normalized_value);
                switch (metric) {
                    case 'mean':
                        tempAssessments2[key] = mean(tempAssessments2[key]);
                        break;
                    case 'median':
                        tempAssessments2[key] = median(tempAssessments2[key]);
                        break;
                    case 'min':
                        tempAssessments2[key] = min(tempAssessments2[key]);
                        break;
                    case 'max':
                        tempAssessments2[key] = max(tempAssessments2[key]);
                        break;
                }
            });

            Object.keys(tempAssessments2).forEach((key) => {
                this.activeAssessments.push({ indicator: key, normalized_value: tempAssessments2[key] });
            });
        }
        setTimeout(() => {
            this.showChart = true;
        }, 500);

        console.log(this.activeAssessments);
    }
}
