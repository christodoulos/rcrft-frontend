import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { ICategoryNames } from '../../shared/interfaces/indicator/categoryNames.interfaces';
import { take } from 'rxjs';
import { ISubcategoryNames } from '../../shared/interfaces/indicator/subcategoryNames.interface';
import { AuthService } from '../../shared/services/auth.service';
import { IIndicator } from '../../shared/interfaces/indicator/indicator.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-indicator',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './new-indicator.component.html',
    styleUrl: './new-indicator.component.css',
})
export class NewIndicatorComponent implements OnInit {
    indicatorsService = inject(IndicatorsService);
    authService = inject(AuthService);
    router = inject(Router);

    currentUser = this.authService.user;
    categoryNames: string[] = [];
    subcategoryNames: string[] = [];

    form: FormGroup | null = null; // the form will contain all fields except the sliders

    ngOnInit(): void {
        this.indicatorsService
            .getCategoryNames()
            .pipe(take(1))
            .subscribe((res: ICategoryNames) => {
                this.categoryNames = res.categoryNames;
            });

        this.indicatorsService
            .getSubcategoryNames()
            .pipe(take(1))
            .subscribe((res: ISubcategoryNames) => {
                this.subcategoryNames = res.subcategoryNames;
            });

        this.form = new FormGroup({
            description: new FormControl('', Validators.required),
            categoryDescription: new FormControl('', Validators.required),
            dataRequirements: new FormControl(''),
            kind: new FormControl('', Validators.required),
            mainAffectedSector: new FormControl(''),
            mainClimateChangeFactor: new FormControl(''),
            metricsAndUnits: new FormControl(''),
            otherAffectedSectors: new FormControl(''),
            otherClimateChangeFactors: new FormControl(''),
            principal: new FormControl(''),
            references: new FormControl(''),
            spatialScale: new FormControl(''),
            subcategoryDescription: new FormControl('', Validators.required),
            type: new FormControl(''),
            typology: new FormControl(''),
        });
    }

    onSubmit(): void {
        const data = this.form.value;
        data.definedBy = this.currentUser().name;

        const newIndicator: IIndicator = {
            code: '',
            definedBy: data.definedBy,
            category: {
                code: '',
                description: data.categoryDescription,
            },
            data_requirements: data.dataRequirements,
            description: data.description,
            kind: data.kind,
            main_affected_sector: data.mainAffectedSector,
            main_climate_change_factor: data.mainClimateChangeFactor,
            metrics_and_units: data.metricsAndUnits,
            other_affected_sectors: data.otherAffectedSectors,
            other_climate_change_factors: data.otherClimateChangeFactors,
            principal: data.principal,
            references: data.references,
            spatial_scale: data.spatialScale,
            subcategory: {
                code: '',
                description: data.subcategoryDescription,
            },
            type: data.type,
            typology: data.typology,
        };

        this.indicatorsService.createIndicator(newIndicator).subscribe({
            next: (res: { msg: string }) => {
                console.log(res.msg);
                this.router.navigate(['/indicators']);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
