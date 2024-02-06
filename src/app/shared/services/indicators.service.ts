import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IIndicator } from '../interfaces/indicator/indicator.interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IndicatorsService {
    http = inject(HttpClient);

    getAllIndicators(): Observable<IIndicator[]> {
        const url = `${environment.apiUrl}/rcrft/get-all-indicators`;
        return this.http.get<IIndicator[]>(url);
    }
}
