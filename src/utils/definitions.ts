
export interface Category {
    id: string;
    name: string;
    budget: number;
    createAt?: FieldValue;
    [key: string]: any;
}

import { FieldValue, Timestamp } from "firebase/firestore";

export interface Expense {
    id: string;
    category: string;
    name: string;
    amount: number;
    expenseDate: Timestamp;
    createdAt?: FieldValue;
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

export interface ExpenseQueryOptions {
    startDate: Timestamp;
    endDate: Timestamp;
}
