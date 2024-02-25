import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IIndicator } from '../interfaces/indicator/indicator.interface';
import { environment } from '../../../environments/environment';
import { ICategoryNames } from '../interfaces/indicator/categoryNames.interfaces';
import { ISubcategoryNames } from '../interfaces/indicator/subcategoryNames.interface';

@Injectable({
    providedIn: 'root',
})
export class IndicatorsService {
    http = inject(HttpClient);

    getAllIndicators(): Observable<IIndicator[]> {
        const url = `${environment.apiUrl}/rcrft/get-all-indicators`;
        return this.http.get<IIndicator[]>(url);
    }

    getCategoryNames(): Observable<ICategoryNames> {
        const url = `${environment.apiUrl}/rcrft/get-category-names`;
        return this.http.get<ICategoryNames>(url);
    }

    getSubcategoryNames(): Observable<ISubcategoryNames> {
        const url = `${environment.apiUrl}/rcrft/get-subcategory-names`;
        return this.http.get<ISubcategoryNames>(url);
    }

    createIndicator(indicator: IIndicator): Observable<{ msg: string }> {
        const url = `${environment.apiUrl}/rcrft/add-indicator`;
        return this.http.post<{ msg: string }>(url, indicator);
    }
}
