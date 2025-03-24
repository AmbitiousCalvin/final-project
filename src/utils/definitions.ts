
export interface Category {
    id: string;
    name: string;
    budget: number;
    [key: string]: any;
}

export interface Expense {
    id: string;
    category: string;
    name: string;
    amount: number;
    [key: string]: any;
}


export interface User {
    uid: string;
    displayName: string | null;
    email: string;
    photoURL: string | null;
    emailVerified: boolean;
    [key: string]: any;
}
