import { Users, ErrorLogger } from './firebase'
import { onSnapshot, orderBy, doc, setDoc, updateDoc, collection, serverTimestamp, query, deleteDoc, where, Timestamp } from 'firebase/firestore'
import { User, Expense, ExpenseQueryOptions } from './definitions'
import { useState, useEffect } from 'react'
// Create & Update Expenses

export async function createExpense(userId: string, expense: Expense) {
    const ref = doc(Users, userId)
    const expensesRef = collection(ref, "expenses")
    const docRef = doc(expensesRef, expense.id)

    try {

        await setDoc(docRef, {
            id: expense.id,
            category: expense.category,
            name: expense.name,
            amount: expense.amount ,
            expenseDate: expense.expenseDate,
            createAt: serverTimestamp(),
        } as Expense);

    } catch (err) {
        ErrorLogger(err, "createExpense Error")
    }
}


export async function updateExpense(userId: string, expense: Expense) {
    const ref = doc(Users, userId)
    const expensesRef = collection(ref, "expenses")
    const docRef = doc(expensesRef, expense.id)

    try {
        await updateDoc(docRef, {
            category: expense.category,
            name: expense.name,
            amount: expense.amount,
            expenseDate: expense.expenseDate,
        });

    } catch (err) {
        ErrorLogger(err, "updateExpense Error")
    }
}

export async function deleteExpense(userId: string, expense: Expense) {
    try {
        const ref = doc(Users, userId)
        const expensesRef = collection(ref, "expenses")
        const docRef = doc(expensesRef, expense.id)

        await deleteDoc(docRef);
        console.log("Expense deleted successfully");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

// fetch all expenses within this current year or any year
// fetch all the daily expense of this current year: DONE

// idea: i could use this function for both monthly daily expense and year daily expense
// BUT I am going to show the monthly daily expense first so can't combine the functions REMINDER!


export function usefetchAllExpenses(
    user: User,
    options?: ExpenseQueryOptions
) {

    const [expenses, setExpenses] = useState([])
    const [expensesLoading, setExpensesLoading] = useState(true)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const currentYear = new Date().getFullYear();
    const defaultOptions: ExpenseQueryOptions  = {
        startDate: Timestamp.fromDate(new Date(currentYear, 0, 1)),
        endDate: Timestamp.fromDate(new Date(currentYear, 11, 31, 23, 59, 59, 999))
    }

    const finalOptions = {...defaultOptions, ...options}

    useEffect(() => {
        if (!user) return

        // to do: fecth all expenses within a date
        const ref = collection(Users, user.uid, "expenses");
        setExpensesLoading(true)

        const expenseQuery = query(
            ref,
            where("expenseDate", ">=", finalOptions.startDate),
            where("expenseDate", "<=", finalOptions.endDate),
            orderBy("expenseDate", "asc")
        )
        const unsubscribe = onSnapshot(expenseQuery, (snapshot) => {

            let total = 0
            const fetchedData = snapshot.docs.map(doc => {


                let data = {
                    ...doc.data(),
                } as Expense

                // data.expenseDate is a firestore Timestamp object so changed it to 'month/day/year' format
                let newExpenseDate = data.expenseDate.toDate().toLocaleDateString('en-US')

                total += data.amount

                return { ...data, expenseDate: newExpenseDate }
            });

            setExpenses(fetchedData);
            setTotalExpenses(total)
            setExpensesLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return { expenses, expensesLoading, totalExpenses }
}



// select any month within current year Default! or any year
// this month daily expense: DONE

export function useFetchMonthlyExpenses(
    user: User,
    month: number = new Date().getMonth(), // Month is 0-indexed (January = 0)
    year: number = new Date().getFullYear(),
) {
    const [expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalExpenses, setTotalExpenses] = useState(0)


    const lastDay = getLastDayOfMonth(year, month)
    const options: ExpenseQueryOptions = {
        startDate: Timestamp.fromDate(new Date(year, month, 1)),
        endDate: Timestamp.fromDate(new Date(year, month, lastDay, 23, 59, 59, 999))
    }


    useEffect(() => {
        if (!user) return

        // to do: fecth all expenses within a date
        const ref = collection(Users, user.uid, "expenses");
        setIsLoading(true)

        const expenseQuery = query(
            ref,
            where("expenseDate", ">=", options.startDate),
            where("expenseDate", "<=", options.endDate),
            orderBy("expenseDate", "asc")
        )

        const unsubscribe = onSnapshot(expenseQuery, (snapshot) => {

            let total = 0
            const fetchedData = snapshot.docs.map(doc => {

                let data = doc.data() as Expense

                // Format the expense date
                let newExpenseDate = data.expenseDate.toDate().toLocaleDateString('en-US')

                total += data.amount

                return { ...data, expenseDate: newExpenseDate }
            });

            setExpenses(fetchedData);
            setTotalExpenses(total)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return { expenses, expensesLoading: isLoading, totalExpenses }
}


function getLastDayOfMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}

