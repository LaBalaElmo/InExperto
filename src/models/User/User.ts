export interface User {
    id?: [] | [bigint];
    name: string;
    lastname: string;
    description: string;
    birthDate: string;
    ci: string;
    urlProfile?: [];
    urlBanner?: [];
    skills?: string[];
    email: string;
    password: string;
    pagesID?: string[];
    pages?: string[];
    recommendationsID?: string[];
    recommendations?: string[];
    experiencesID?: string[];
    experiences?: string[];
}