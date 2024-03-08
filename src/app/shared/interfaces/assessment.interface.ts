export interface IAssessment {
    indicator: string;
    user: string;
    demoSite: string;
    stakeHolderType: string;
    degreeOfCertainty: number;
    value: number;
    reference_value: number;
    min_value: number;
    max_value: number;
    is_inverse: boolean;
    alternative_description: string;
    normalized_value: number;
}
