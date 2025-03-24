import { Users, ErrorLogger } from './firebase'
import { onSnapshot, doc, getDocs, setDoc, updateDoc, collection, serverTimestamp, query, deleteDoc, where } from 'firebase/firestore'
import { User, Category, Expense } from './definitions'
import { useState, useEffect } from 'react'
import { deleteExpense } from './expenses'

export async function createCategory(userId: string, category: Category){
    const ref = doc(Users, userId)
    const categoriesRef = collection(ref, "categories")
    const docRef = doc(categoriesRef, category.id)

    try{

        await setDoc(docRef, {
            id: category.id,
            name: category.name,
            budget: category.budget,
            createAt: serverTimestamp(),
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
            budget: category.budget
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

        // delete the category doc
        const categoryDocRef = doc(categoriesRef, category.id)
        await deleteDoc(categoryDocRef);
        console.log("Category deleted successfully");

        // delete all expenses with the related category
        const expenseQuery = query(expensesRef, where("category", "==", `${category.name}`))
        const querySnapshot = await getDocs(expenseQuery);

        if (!querySnapshot.empty) {

            for (const doc of querySnapshot.docs) {
                const expense = doc.data() as Expense
                await deleteExpense(userId, expense);
            }

        }else {
            console.log("no expenses to delete in this category")
        }


    } catch (error) {
        ErrorLogger(error, "Error deleting categories and expenses");
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
            setTotalBudget(total)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return { categories, categoriesLoading: isLoading, totalBudget}
}
