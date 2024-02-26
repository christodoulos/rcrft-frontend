import { Component, Input, inject } from '@angular/core';
import { IIndicator } from '../../../interfaces/indicator/indicator.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-assess-type-modal',
    standalone: true,
    imports: [],
    templateUrl: './assess-type-modal.component.html',
    styleUrl: './assess-type-modal.component.css',
})
export class AssessTypeModalComponent {
    @Input() indicator: IIndicator;
    @Input() modalRef: any;
    router = inject(Router);

    onAssessClick(type: string) {
        switch (type) {
            case 'a':
                this.router.navigate(['/assess', 'quantitative', 'reference'], { state: { indicator: this.indicator } });
                break;
            case 'b':
                this.router.navigate(['/assess', 'quantitative', 'min-max'], { state: { indicator: this.indicator } });
                break;
            case 'c':
                this.router.navigate(['/assess', 'qualitative'], { state: { indicator: this.indicator } });
                break;
        }
        this.modalRef.dismiss();
    }
}
