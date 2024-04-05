import { ItemDecoration } from "../Decorations";

export interface EmployeeCard {
    id: number;
    title: string;
    description: string;
    items: ItemDecoration[];
    image?: string;
}

