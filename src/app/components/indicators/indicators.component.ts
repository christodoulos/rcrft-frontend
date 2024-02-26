import { Component, OnInit, inject } from '@angular/core';
import { IIndicator } from '../../shared/interfaces/indicator/indicator.interface';
import { IndicatorsService } from '../../shared/services/indicators.service';
import { DataTablesModule } from 'angular-datatables';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { IUser } from '../../shared/interfaces/auth/user.interface';
import { ModalService } from '../../shared/services/modal.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-indicators',
    standalone: true,
    imports: [CommonModule, DataTablesModule, RouterLink],
    templateUrl: './indicators.component.html',
    styleUrl: './indicators.component.css',
})
export class IndicatorsComponent implements OnInit {
    indicatorsService = inject(IndicatorsService);
    modalService = inject(ModalService);
    authService = inject(AuthService);
    allUsers: IUser[] | null = null;

    currentUser = this.authService.user;
    indicators: IIndicator[] = [];
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.authService
            .getAllUsers()
            .pipe(take(1))
            .subscribe(
                (users: IUser[]) => {
                    this.allUsers = users;
                },
                (err) => {
                    console.log(err);
                }
            );

        this.indicatorsService
            .getAllIndicators()
            .pipe(take(1))
            .subscribe((indicators: IIndicator[]) => {
                this.indicators = indicators;
                console.log(this.indicators);
            });
    }

    findUserDemoSite(indicator: IIndicator) {
        const demoSiteUser = this.allUsers.find((user) => user.name === indicator.definedBy);
        if (demoSiteUser) {
            return demoSiteUser.demoSite;
        }
        return '';
    }

    onDetailsClick(indicator: IIndicator) {
        this.modalService.showIndicatorDetails(indicator);
    }

    onAssessClick(indicator: IIndicator) {
        this.modalService.selectAssessType(indicator);
    }
}
