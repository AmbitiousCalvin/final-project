import { doc, collection, setDoc, Timestamp } from 'firebase/firestore'
import { faker } from '@faker-js/faker';
import { Category, Expense } from './utils/definitions'
import { auth, Users } from './utils/firebase'


// Generate Fake Categories
async function generateFakeCategories(): Promise<Category[]> {
  if (!auth.currentUser) return []

  const ref = doc(Users, auth.currentUser.uid)
  const categoriesRef = collection(ref, "categories")
  const categories: Category[] = [];

  // Generate 10 categories (you can adjust this number)
  for (let i = 0; i < 10; i++) {
    const id = faker.string.uuid()
    const docRef = doc(categoriesRef, id)

    const timestamp = Timestamp.fromDate(new Date(2025, 2, i + 1));

    const category = {
      id: id,
      name: faker.commerce.department(),
      budget: Number(faker.commerce.price({ min: 100, max: 3000, dec: 2 })),
      createdAt: timestamp,
    } as Category;

    categories.push(category);
    await setDoc(docRef, category);
  }

  console.log('Fake categories added successfully!');
  return categories;
}

// Generate Fake Expenses
async function generateFakeExpenses(categories: Category[]) {
  if (!auth.currentUser) return

    const ref = doc(Users, auth.currentUser.uid)
    const expensesRef = collection(ref, "expenses")

    // Generate 50 expenses (you can adjust this number)
    for (let i = 0; i < 31; i++) {
      const id = faker.string.uuid()
      const docRef = doc(expensesRef, id)
      const category = faker.helpers.arrayElement(categories);

      const timestamp = Timestamp.fromDate(new Date(2025, 2, i + 1));
      

      const expense = {
        id,
        category: category.name,
        name: faker.commerce.productName(),
        amount: Number(faker.commerce.price({ min: 100, max: 800, dec: 2 })),
        expenseDate: timestamp,
        createdAt: timestamp,
      } as Expense;

    await setDoc(docRef, expense);
  }

  console.log('Fake expenses added successfully!');
}

// Main function to generate both categories and expenses
async function generateFakeData() {

  const categories = await generateFakeCategories();
  await generateFakeExpenses(categories);
}

export { generateFakeData };
