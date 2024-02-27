import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { take } from 'rxjs';

@Component({
    selector: 'app-assessments',
    standalone: true,
    imports: [CommonModule, DataTablesModule, RouterLink],
    templateUrl: './assessments.component.html',
    styleUrl: './assessments.component.css',
})
export class AssessmentsComponent implements OnInit {
    indicatorsService = inject(IndicatorsService);

    assessments: IAssessment[] = [];
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
                console.log(this.assessments);
            });
    }
}
