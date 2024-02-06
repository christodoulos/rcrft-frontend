import { ICategory } from './category.interface';
import { ISubcategory } from './subcategory.interface';

export interface IIndicator {
    code: string;
    category: ICategory;
    data_requirements: string;
    description: string;
    kind: string;
    main_affected_sector: string;
    main_climate_change_factor: string;
    metrics_and_units: string;
    other_affected_sectors: string;
    other_climate_change_factors: string;
    principal: string;
    references: string;
    spatial_scale: string;
    subcategory: ISubcategory;
    type: string;
    typology: string;
}
