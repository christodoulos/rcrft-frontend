import { Component, OnInit, inject } from '@angular/core';
import { IIndicator } from '../../shared/interfaces/indicator/indicator.interface';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { DataTablesModule } from 'angular-datatables';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-indicators',
    standalone: true,
    imports: [CommonModule, DataTablesModule],
    templateUrl: './indicators.component.html',
    styleUrl: './indicators.component.css',
})
export class IndicatorsComponent implements OnInit {
    indicatorsService = inject(IndicatorsService);
    indicators: IIndicator[] = [];
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.indicatorsService
            .getAllIndicators()
            .pipe(take(1))
            .subscribe((indicators: IIndicator[]) => {
                this.indicators = indicators;
                console.log(this.indicators);
            });
    }
}
