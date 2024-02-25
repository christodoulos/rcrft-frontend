import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IndicatorDetailsComponent } from '../components/modals/indicator-details/indicator-details.component';
import { IIndicator } from '../interfaces/indicator/indicator.interface';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    modalService = inject(NgbModal);

    showIndicatorDetails(indicator: IIndicator) {
        console.log(indicator);
        const modalRef = this.modalService.open(IndicatorDetailsComponent, { size: 'lg', centered: true });
        modalRef.componentInstance.indicator = indicator;
    }
}
