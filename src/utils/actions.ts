import { Users, ErrorLogger } from './firebase'
import { onSnapshot, orderBy, doc, getDoc, getDocs, setDoc, updateDoc, collection, serverTimestamp, query, deleteDoc, where } from 'firebase/firestore'
import { User, Category, Expense } from './definitions'
import { useState, useEffect } from 'react'

export async function createUserDocument(user: User){
    const ref = doc(Users, user.uid)
    const snap = await getDoc(ref)

    // to do: uncomment this after the app is finished
    // const hasAccount = JSON.parse(localStorage.getItem("hasAccount")) || false;

    if (false || snap.exists()) return

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

export async function getUserAccCreationDay(userId: string){
    const ref = doc(Users, userId)
    const date = JSON.parse(localStorage.getItem("createAt"))
    let snapshot = null;

    if (!date) {
        snapshot = await getDoc(ref)
        const user: User = snapshot.data()

        let date = user.createAt.toDate().toLocaleDateString('en-US')
        localStorage.setItem("createAt", JSON.stringify(date))

        return date
    }

    return date
}

// Create & Update Budget Categories

export async function createCategory(userId: string, category: Category){
    const ref = doc(Users, userId)
    const categoriesRef = collection(ref, "categories")
    const docRef = doc(categoriesRef, category.id)

    try{

        await setDoc(docRef, {
            id: category.id,
            name: category.name,
            budget: category.budget * 100,
            date: serverTimestamp(),
        } as Category)

    }catch (err) {
        ErrorLogger(err, "createCategory Error")
    }
}


export async function updateCategory(userId: string, category: Category) {
    const ref = doc(Users, userId)
    const categoriesRef = collection(ref, "categories")
    const docRef = doc(categoriesRef, category.id)

    try {
        await updateDoc(docRef, {
            name: category.name,
            budget: category.budget * 100
        });

    } catch (err) {
        ErrorLogger(err, "updateCategory Error")
    }
}

export async function deleteCategory(userId: string, category: Category) {
    try {
        const ref = doc(Users, userId)
        const categoriesRef = collection(ref, "categories")
        const expensesRef = collection(ref, "expenses")
        const docRef = doc(categoriesRef, category.id)
        await deleteDoc(docRef);
        console.log("Category deleted successfully");

        const expenseQuery = query(expensesRef, where("category", "==", `${category.name}`))
        const querySnapshot = await getDocs(expenseQuery);

        if (!querySnapshot.empty) {

            for (const doc of querySnapshot.docs) {
                await deleteExpense(userId, doc.data());
            }

        }else {
            console.log("no expenses to delete in this category")
        }




    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

export function usefetchAllCategories(user: User){
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalBudget, setTotalBudget] = useState(0)

    useEffect(() => {
        if (!user) return

        const ref = collection(Users, user.uid, "categories");
        setIsLoading(true)

        const unsubscribe = onSnapshot(ref, (snapshot) => {

            let total = 0

            const fetchedData = snapshot.docs.map(doc => {
                const data = {
                    ...doc.data(),
                } as Category

                total += data.budget

                return data
            });
            setCategories(fetchedData);
            setTotalBudget(total / 100)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return { categories, categoriesLoading: isLoading, totalBudget}
}

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
            amount: expense.amount * 100,
            date: serverTimestamp(),
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
            amount: expense.amount * 100
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

// fetch all expenses
export function usefetchAllExpenses(user: User) {
    const [expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalExpenses, setTotalExpenses] = useState(0)

    useEffect(() => {
        if (!user) return

        const ref = collection(Users, user.uid, "expenses");
        setIsLoading(true)

        const expenseQuery = query(ref, orderBy("date", "asc"))
        const unsubscribe = onSnapshot(expenseQuery, (snapshot) => {

            let total = 0
            const fetchedData = snapshot.docs.map(doc => {


                let data = {
                    ...doc.data(),
                } as Expense

                data.date = data.date.toDate().toLocaleDateString('en-US')

                total += data.amount

                return { ...data }
            });

            setExpenses(fetchedData);
            setTotalExpenses(total / 100)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return { expenses, expensesLoading: isLoading, totalExpenses }
}

const data = {
    1: { total: 0, array: [], month: "January" },
    2: { total: 0, array: [], month: "February" },
    3: { total: 0, array: [], month: "March" },
    4: { total: 0, array: [], month: "April" },
    5: { total: 0, array: [], month: "May" },
    6: { total: 0, array: [], month: "June" },
    7: { total: 0, array: [], month: "July" },
    8: { total: 0, array: [], month: "August" },
    9: { total: 0, array: [], month: "September" },
    10: { total: 0, array: [], month: "October" },
    11: { total: 0, array: [], month: "November" },
    12: { total: 0, array: [], month: "December" }
};

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export function useMonthlyBarChart( expenses: Expense[] ){
    const [monthlyExpenses, setMonthlyExpenses] = useState(() => Array(12).fill(0))
    const [highestExpenseMonth, setHighestExpenseMonth] = useState(Number.NEGATIVE_INFINITY);
    const [lowestExpenseMonth, setLowestExpenseMonth] = useState(Number.POSITIVE_INFINITY);

    useEffect(() => {
        const newMonthlyExpenses = Array(12).fill(0)
        let highest = Number.NEGATIVE_INFINITY;
        let lowest = Number.POSITIVE_INFINITY;

        for (let expense of expenses) {
            const month = Number(expense.date[0]);
            // did this so i can select what month to show without calling function everytime
            data[month].total += expense.amount;
            data[month].array.push(expense);
            //======================================

            newMonthlyExpenses[month - 1] += expense.amount
        }

        for (let i = 0; i < monthlyExpenses.length; i++) {
            lowest = Math.min(newMonthlyExpenses[i], lowest);
            lowest = Math.max(newMonthlyExpenses[i], lowest);
            newMonthlyExpenses[i] = parseFloat((newMonthlyExpenses[i] / 100).toFixed(2));
        }

        setHighestExpenseMonth(highest)
        setLowestExpenseMonth(lowest)
        setMonthlyExpenses(newMonthlyExpenses)

    }, [expenses])

    return { months, monthlyExpenses, lowestExpenseMonth, highestExpenseMonth }
}

export function useExpenseAcrossCategoriesByMonth(expenses: Expense[], month: number) {
    const [categories, setCategories] = useState<string[]>([]);
    const [dataSet, setDataSet] = useState<number[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const categoryData: Record<string, number> = {};
        let newTotal = 0;

        for (let expense of expenses) {
            const m = Number(expense.date.split("/")[0]);

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


