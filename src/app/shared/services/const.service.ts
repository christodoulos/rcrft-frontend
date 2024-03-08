import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConstService {
    readonly DEMO_SITES = [
        'Berlin-Brandenburg, DE',
        'Coast of Catalonia, ES',
        'Region of Attica, GR',
        'Province of Zeeland, NL',
        'Troms & Finnmark, NO',
        'Zemgale region, LV',
        'Valle dei Laghi area, IT',
        'Not specified',
    ];

    readonly StakeHolderTypes = ['Public', 'Private', 'Academic', 'Government', 'NGO', 'Not Specified'];

    NUMBER_REGEX = /^[-+]?\d*\.?\d+$/;
}
