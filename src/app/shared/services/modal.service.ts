import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IndicatorDetailsComponent } from '../components/modals/indicator-details/indicator-details.component';
import { IIndicator } from '../interfaces/indicator/indicator.interface';
import { AssessTypeModalComponent } from '../components/modals/assess-type-modal/assess-type-modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    modalService = inject(NgbModal);

    showIndicatorDetails(indicator: IIndicator) {
        console.log(indicator);
        const modalRef = this.modalService.open(IndicatorDetailsComponent, { size: 'xl', centered: true });
        modalRef.componentInstance.indicator = indicator;
    }

    selectAssessType(indicator: IIndicator) {
        const modalRef = this.modalService.open(AssessTypeModalComponent, { size: 'md', centered: true });
        modalRef.componentInstance.indicator = indicator;
        modalRef.componentInstance.modalRef = modalRef;
    }
}
