import { Users, ErrorLogger } from './firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { User, Expense } from './definitions'
import { useState, useEffect } from 'react'
import { createCategory, deleteCategory, updateCategory, usefetchAllCategories } from './categories';
import { createExpense, deleteExpense, updateExpense, usefetchAllExpenses } from './expenses';

export { createCategory, deleteCategory, updateCategory, usefetchAllCategories, createExpense, deleteExpense, updateExpense, usefetchAllExpenses }


export async function createUserDocument(user: User){
    const ref = doc(Users, user.uid)
    const snap = await getDoc(ref)

    // to do: uncomment this after the app is finished
    const hasAccount = JSON.parse(localStorage.getItem("hasAccount") ?? "");

    if (!hasAccount || snap.exists()) return

    try{
        await setDoc(ref, {
            userId: user.uid,
            createAt: serverTimestamp(),
        })

        localStorage.setItem("hasAccount", JSON.stringify(true))
        console.log("User document created");

    }catch (err) {
        ErrorLogger(err, "createUserDocument Error")
    }

}

export async function getUserJoinDate(userId: string){
    const ref = doc(Users, userId)
    const date = (JSON.parse(localStorage.getItem("createAt") ?? ""))
    let snapshot = null;

    if (date == null) {
        const snapshot = await getDoc(ref);

        if (snapshot === null) {
            ErrorLogger("getUserAccCreationDay Error. snapshot is null");
            return 0;
        }

        const user = snapshot.data() as User;
        const date = user.createAt.toDate();
        localStorage.setItem("createAt", JSON.stringify(date));

        return date;
    }

    return date
}




// need to refactor this function
// the monthlyExpenses state should have been done in usefetchAllExpenses
// only use this function for getting the highestExpenseMonth, lowestExpenseMonth
// idea:            combine this function with usefetchAllExpenses
//                  to save time

//== requirements
// Bar Chart for Monthly Totals:
// Displays the total expenses for each month of the year.A year - long visual comparison helps identify trends.

export function useMonthlyBarChart( expenses: Expense[] ){
    const [monthlyExpenses, setMonthlyExpenses] = useState(() => Array(12).fill(0))
    const [highestExpenseMonth, setHighestExpenseMonth] = useState(Number.NEGATIVE_INFINITY);
    const [lowestExpenseMonth, setLowestExpenseMonth] = useState(Number.POSITIVE_INFINITY);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const newMonthlyExpenses = Array(12).fill(0)
        let highest = Number.NEGATIVE_INFINITY;
        let lowest = Number.POSITIVE_INFINITY;

        for (let expense of expenses) {
            const month = Number(expense.expenseDate[0]); // get the first value of expenseDate e.g "3/25/2025"

            newMonthlyExpenses[month - 1] += expense.amount
        }

        for (let i = 0; i < monthlyExpenses.length; i++) {
            lowest = Math.min(newMonthlyExpenses[i], lowest);
            lowest = Math.max(newMonthlyExpenses[i], lowest);
            newMonthlyExpenses[i] = parseFloat((newMonthlyExpenses[i]).toFixed(2));
        }

        setHighestExpenseMonth(highest)
        setLowestExpenseMonth(lowest)
        setMonthlyExpenses(newMonthlyExpenses)

    }, [expenses])

    return { months, monthlyExpenses, lowestExpenseMonth, highestExpenseMonth }
}

// need to refactor this a bit.
// this function will use the value from useFetchMonthlyExpenses
export function useExpenseAcrossCategoriesByMonth(expenses: Expense[], month: number) {
    const [categories, setCategories] = useState([]);
    const [dataSet, setDataSet] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const categoryData: Record<string, number> = {};
        let newTotal = 0;

        for (let expense of expenses) {
            const m = Number(expense.expenseDate[0]); // get first value of expenseDate e.g "3/25/2025"

            if (month === m) {
                categoryData[expense.category] = (categoryData[expense.category] ?? 0) + expense.amount;
                newTotal += expense.amount;
            }
        }

        const newCategories = Object.keys(categoryData);
        const newDataSet = Object.values(categoryData);

        setCategories(newCategories);
        setDataSet(newDataSet);
        setTotal(newTotal);

    }, [expenses, month]); // Runs whenever expenses or month changes

    return { dataSet, categories, total };
}


export function format(value: number, include_decimal: boolean = false) {
    return new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: include_decimal ? 2 : 0
    }).format(value)
}


