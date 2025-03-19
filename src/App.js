import "./styles/general.scss";
import "./styles/styles.scss";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLayout } from "./contexts/layoutContext";
import { useState, useRef, useEffect } from "react";
import { useClickOutside } from "./hooks/useClick";

export default function App() {
  const { setDarkMode } = useLayout();
  const categoryDialogRef = useRef(null);
  const expenseDialogRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [expenseInput, setExpenseInput] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    setCategories((prev) => [...prev, form.category.value]);
    setCategoryInput("");
    categoryDialogRef.current.close();
  }

  function handleExpenseSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const category = form.category.value;
    const name = form.expenseName.value;
    const amount = form.expenseAmount.value;
    expenseDialogRef.current.close();

    setExpenses((prev) => [
      ...prev,
      {
        category,
        name,
        amount,
        timestamp: Date.now(),
      },
    ]);
    setExpenseInput("");
    setExpenseAmount(null);
  }

  useEffect(() => {
    console.log("Category:", categories);
    console.log("Expense:", expenses);
  }, [categories, expenses]);

  useClickOutside(categoryDialogRef);
  useClickOutside(expenseDialogRef);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p className="text-gray">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, beatae!
      </p>
      {/* <label htmlFor="">
        Email
        <input type="email" name="email" id="email" />
      </label>
      <hr />
      <label htmlFor="">
        Password
        <input type="password" name="password" id="" />
      </label>
      <hr /> */}

      <div style={{ display: "flex" }}>
        <button className="icon-btn" onClick={() => setDarkMode(true)}>
          <FaMoon />
        </button>
        <button className="icon-btn" onClick={() => setDarkMode(false)}>
          <FaSun />
        </button>
        <button
          className="btn-primary"
          onClick={() => categoryDialogRef.current.showModal()}
        >
          Create Budget
        </button>
        <button
          className="btn-secondary"
          onClick={() => expenseDialogRef.current.showModal()}
        >
          Create Expense
        </button>
        <button className="btn-third">Save</button>
        <button className="btn-gray">Cancel</button>
      </div>
      <dialog ref={categoryDialogRef}>
        <form method="dialog" onSubmit={handleSubmit}>
          <h2>Create Budget</h2>
          <input
            onChange={(e) => setCategoryInput(e.target.value)}
            value={categoryInput}
            type="text"
            name="category"
            placeholder="Category"
          />
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => categoryDialogRef.current.close()}
          >
            Close
          </button>
        </form>
      </dialog>

      <ul>
        <h2>Category</h2>
        {categories.map((category, index) => {
          return (
            <li key={category}>
              {index + 1}. {category}
            </li>
          );
        })}
      </ul>

      <dialog ref={expenseDialogRef}>
        <form method="dialog" onSubmit={handleExpenseSubmit}>
          <h2>Add Expense</h2>
          <select name="category">
            <option value="" disabled selected>
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <input
            onChange={(e) => setExpenseInput(e.target.value)}
            value={expenseInput}
            type="text"
            name="expenseName"
            placeholder="expense name"
          />
          <input
            onChange={(e) => setExpenseAmount(e.target.value)}
            value={expenseAmount}
            type="number"
            name="expenseAmount"
            placeholder="expense amount"
            required
            min="1"
          />

          <button type="submit">Add Expense</button>
          <button
            type="button"
            onClick={() => expenseDialogRef.current.close()}
          >
            Close
          </button>
        </form>
      </dialog>
    </div>
  );
}
