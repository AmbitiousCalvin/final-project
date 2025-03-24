import "./styles/general.scss";
import "./styles/App.scss";
// import { FaMoon, FaSun } from "react-icons/fa";
// import { useLayout } from "./contexts/layoutContext";
// import { useClickOutside } from "./hooks/useClick";
import { Timestamp } from 'firebase/firestore'
// import { useState, useEffect } from "react";
import { useAuthState, googleSignInWithPopup, signOutUser } from "./utils/firebase";

// utilities functions
import { format } from './utils/actions'
import { createCategory, deleteCategory, usefetchAllCategories } from './utils/categories';
import { createExpense, deleteExpense, usefetchAllExpenses } from './utils/expenses';


// components
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import StackedBarChart from './components/StackedBarChart'
import BarChartByCategories from './components/BarChartByCategory'
import { generateFakeData } from './fake'



function App() {
  const { user, authLoading } = useAuthState()
  const { categories, totalBudget, categoriesLoading } = usefetchAllCategories(user)
  const { expenses, totalExpenses, expensesLoading } = usefetchAllExpenses(user)
  // const [selectedValue, setSelectedValue] = useState("")


  if (authLoading) {
    return <h1>Loading...</h1>
  }


  // if (expenses.length === 0){
  //   return <h1>Sorry Error</h1>
  // }

  let button = <button onClick={signOutUser}>Sign out</button>;

  if (!user) {
    button = <button onClick={googleSignInWithPopup}>Sign In with Google</button>
    return button
  }


  function handleCategorySubmit(e) {
    e.preventDefault()

    createCategory(user.uid, {
      name: e.target.name.value,
      budget: parseFloat(e.target.budget.value),
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    })

  }

  function handleExpenseSubmit(e) {
    e.preventDefault()

    createExpense(user.uid, {
      category: e.target.category.value,
      name: e.target.name.value,
      amount: parseFloat(e.target.amount.value),
      expenseDate: Timestamp.fromDate(new Date(e.target.expenseDate.value)),
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    })

  }

  return (
    <>
      <div className="App">
        {button}


        {user && <h1>Welcome back, {user.displayName}!</h1>}

        <input type="month" id="monthPicker" min="2024-03" max="2025-12" />


        <form onSubmit={handleCategorySubmit}>
          <h3>Create Category</h3>
          <input type="text" name="name" required placeholder="Category Name"></input>
          <input type="number" name="budget" step="0.01" required min="0" placeholder="Budget"></input>
          <button type="submit">Submit</button>
        </form>

        <br></br>
        <hr></hr>
        <br></br>

        <form onSubmit={handleExpenseSubmit}>
          <h3>Create Expense</h3>
          <select required name="category" defaultValue=""
          // onChange={(e) => {
          //   setSelectedValue(e.target.value)
          // }}
          >
            <option disabled value="">Select a category</option>
            {!!categories.length && categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
            <option value="other">Other</option>
          </select>
          <input type="text" name="name" required placeholder="Expense Name"></input>
          <input type="date" name="expenseDate" required placeholder="Expense Date"></input>
          <input type="number" step="0.01" name="amount" required min="0" placeholder="Amount"></input>
          <button type="submit">Submit</button>
        </form>

        <br></br>
        <hr></hr>
        <button onClick={generateFakeData}>Generate Fake data</button>

        <input type="month" id="monthPicker" />

        <br></br>

        <div style={{
          display: "flex",
          gap: "1rem",
        }}>
          <ul>
            <h3>Categories: {format(totalBudget, true)}</h3>
            {categoriesLoading && <h2>Loading...</h2>}

            {!!categories.length && categories.map(category => {
              return (
                <li key={category.id} >
                  <p>Name: {category.name} |</p>
                  <p>Budget: {format(category.budget, true)}</p>
                  <button onClick={() => deleteCategory(user.uid, category)}>Delete</button>
                </li>
              )
            })}

          </ul>

          <hr className="vertical"></hr>

          <ul>
            <h3>Expenses: {format(totalExpenses, true)}</h3>
            {expensesLoading && <h2>Loading...</h2>}

            {!!expenses.length && expenses.map(expense => {
              return (
                <li key={expense.id}>
                  <p>Category: {expense.category} |</p>
                  <p>Budget: {format(expense.amount, true)}</p>
                  <button onClick={() => deleteExpense(user.uid, expense)}>Delete</button>
                </li>
              );
            })}

          </ul>

          <hr className="vertical"></hr>
          <PieChart totalBudget={totalBudget} spentAmount={totalExpenses} />
        </div>
        <br></br>
        <hr />
        <br></br>
        <LineChart expenses={expenses}></LineChart>

        <br></br>
        <hr />
        <br></br>
        <StackedBarChart expenses={expenses}></StackedBarChart>

        <br></br>
        <hr />
        <br></br>

        <BarChartByCategories expenses={expenses}></BarChartByCategories>
      </div>
    </>
  )
}






export default App
