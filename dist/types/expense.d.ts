export type Category = 'food' | 'transport' | 'utilities' | 'entertainment' | 'shopping' | 'health' | 'housing' | 'other';
export interface Expense {
    id: string;
    amount: number;
    currency: string;
    category: Category;
    description: string;
    date: Date;
    recurring?: boolean;
    receipt?: string;
}
export interface Budget {
    category: Category;
    limit: number;
    spent: number;
    currency: string;
}
