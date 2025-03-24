// function app() {
//     const { setDarkMode } = useLayout();
//     const categoryDialogRef = useRef(null);
//     const expenseDialogRef = useRef(null);
//     const [categories, setCategories] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [categoryInput, setCategoryInput] = useState("");
//     const [expenseInput, setExpenseInput] = useState("");
//     const [expenseAmount, setExpenseAmount] = useState(null);

//     function handleSubmit(e) {
//         e.preventDefault();
//         const form = e.target;
//         setCategories((prev) => [...prev, form.category.value]);
//         setCategoryInput("");
//         categoryDialogRef.current.close();
//     }

//     function handleExpenseSubmit(e) {
//         e.preventDefault();
//         const form = e.target;
//         const category = form.category.value;
//         const name = form.expenseName.value;
//         const amount = form.expenseAmount.value;
//         expenseDialogRef.current.close();

//         setExpenses((prev) => [
//             ...prev,
//             {
//                 category,
//                 name,
//                 amount,
//                 timestamp: Date.now(),
//             },
//         ]);
//         setExpenseInput("");
//         setExpenseAmount(null);
//     }

//     useEffect(() => {
//         console.log("Category:", categories);
//         console.log("Expense:", expenses);
//     }, [categories, expenses]);

//     useClickOutside(categoryDialogRef);
//     useClickOutside(expenseDialogRef);

//     return (
//         <div className="App">
//             <h1>Hello CodeSandbox</h1>
//             <h2>Start editing to see some magic happen!</h2>
//             <p className="text-gray">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, beatae!
//             </p>
//             {/* <label htmlFor="">
//         Email
//         <input type="email" name="email" id="email" />
//       </label>
//       <hr />
//       <label htmlFor="">
//         Password
//         <input type="password" name="password" id="" />
//       </label>
//       <hr /> */}

//             <div style={{ display: "flex" }}>
//                 <button className="icon-btn" onClick={() => setDarkMode(true)}>
//                     <FaMoon />
//                 </button>
//                 <button className="icon-btn" onClick={() => setDarkMode(false)}>
//                     <FaSun />
//                 </button>
//                 <button
//                     className="btn-primary"
//                     onClick={() => categoryDialogRef.current.showModal()}
//                 >
//                     Create Budget
//                 </button>
//                 <button
//                     className="btn-secondary"
//                     onClick={() => expenseDialogRef.current.showModal()}
//                 >
//                     Create Expense
//                 </button>
//                 <button className="btn-third">Save</button>
//                 <button className="btn-gray">Cancel</button>
//             </div>
//             <dialog ref={categoryDialogRef}>
//                 <form method="dialog" onSubmit={handleSubmit}>
//                     <h2>Create Budget</h2>
//                     <input
//                         onChange={(e) => setCategoryInput(e.target.value)}
//                         value={categoryInput}
//                         type="text"
//                         name="category"
//                         placeholder="Category"
//                     />
//                     <button type="submit">Add</button>
//                     <button
//                         type="button"
//                         onClick={() => categoryDialogRef.current.close()}
//                     >
//                         Close
//                     </button>
//                 </form>
//             </dialog>

//             <ul>
//                 <h2>Category</h2>
//                 {categories.map((category, index) => {
//                     return (
//                         <li key={category}>
//                             {index + 1}. {category}
//                         </li>
//                     );
//                 })}
//             </ul>

//             <dialog ref={expenseDialogRef}>
//                 <form method="dialog" onSubmit={handleExpenseSubmit}>
//                     <h2>Add Expense</h2>
//                     <select name="category">
//                         <option value="" disabled selected>
//                             Select a category
//                         </option>
//                         {categories.map((category) => {
//                             return (
//                                 <option key={category} value={category}>
//                                     {category}
//                                 </option>
//                             );
//                         })}
//                     </select>
//                     <input
//                         onChange={(e) => setExpenseInput(e.target.value)}
//                         value={expenseInput}
//                         type="text"
//                         name="expenseName"
//                         placeholder="expense name"
//                     />
//                     <input
//                         onChange={(e) => setExpenseAmount(e.target.value)}
//                         value={expenseAmount}
//                         type="number"
//                         name="expenseAmount"
//                         placeholder="expense amount"
//                         required
//                         min="1"
//                     />

//                     <button type="submit">Add Expense</button>
//                     <button
//                         type="button"
//                         onClick={() => expenseDialogRef.current.close()}
//                     >
//                         Close
//                     </button>
//                 </form>
//             </dialog>
//         </div>
//     );
// }













// const message = 'Hello world'; // Try edit me

// // Update header text
// const transactions = [
//     {
//         id: '429481f8-e9c9-4152-98aa-2f4408ab5230',
//         date: '1/1/2025',
//         amount: 60829,
//         category: 'Clothing',
//         name: 'Ergonomic Concrete Computer',
//     },
//     {
//         id: 'cbc77bdb-798f-4b42-9c8d-3f44418a92ec',
//         date: '2/2/2025',
//         amount: 21149,
//         category: 'Music',
//         name: 'Luxurious Steel Keyboard',
//     },
//     {
//         id: '1697035b-1c66-49c0-bda7-4ff7f0c26a14',
//         date: '12/3/2025',
//         amount: 24005,
//         category: 'Tools',
//         name: 'Luxurious Ceramic Fish',
//     },
//     {
//         id: '423241e7-395f-407e-84cd-b014ca4eb89a',
//         date: '5/4/2025',
//         amount: 36015,
//         category: 'Clothing',
//         name: 'Sleek Gold Shoes',
//     },
//     {
//         id: 'b5831d77-2427-41e3-b16c-4312bb4f00ef',
//         date: '8/5/2025',
//         amount: 30769,
//         category: 'Clothing',
//         name: 'Tasty Metal Salad',
//     },
//     {
//         id: '0dddc10b-b931-4e8f-9e48-9e0589aa039b',
//         date: '10/6/2025',
//         amount: 50349,
//         category: 'Tools',
//         name: 'Fantastic Bronze Fish',
//     },
//     {
//         id: 'f5a57e93-a125-459d-93c8-8eb3c9936f35',
//         date: '7/7/2025',
//         amount: 55349,
//         category: 'Electronics',
//         name: 'Licensed Marble Shoes',
//     },
//     {
//         id: '8a45aed4-5f2a-4a97-8e49-32745f20eb79',
//         date: '3/8/2025',
//         amount: 22399,
//         category: 'Music',
//         name: 'Practical Rubber Bike',
//     },
//     {
//         id: '9963be2e-b29b-4b96-9e88-8b60855a21c3',
//         date: '11/9/2025',
//         amount: 70385,
//         category: 'Clothing',
//         name: 'Unbranded Rubber Computer',
//     },
//     {
//         id: '800f1409-1aa5-423d-b359-48713f2a2401',
//         date: '6/10/2025',
//         amount: 45603,
//         category: 'Clothing',
//         name: 'Rustic Rubber Computer',
//     },
//     {
//         id: 'a54f47d3-d0c8-4b7d-9e4e-2e8da8f22c4b',
//         date: '4/11/2025',
//         amount: 11319,
//         category: 'Music',
//         name: 'Ergonomic Granite Table',
//     },
//     {
//         id: 'a4974c6f-7bf5-4b9a-8caa-1335915e5c3c',
//         date: '9/12/2025',
//         amount: 54655,
//         category: 'Baby',
//         name: 'Tasty Ceramic Bike',
//     },
//     {
//         id: '6b912921-eb16-44be-8134-db1a6d4f4ad6',
//         date: '12/13/2025',
//         amount: 18500,
//         category: 'Music',
//         name: 'Frozen Wooden Keyboard',
//     },
//     {
//         id: '7648cddc-b681-4480-be36-478c4375feb3',
//         date: '2/14/2025',
//         amount: 76410,
//         category: 'Clothing',
//         name: 'Rustic Rubber Towels',
//     },
//     {
//         id: '23edbc9e-07b9-426d-901d-163be7e5ce2a',
//         date: '5/15/2025',
//         amount: 76345,
//         category: 'Clothing',
//         name: 'Electronic Concrete Bike',
//     },
//     {
//         id: '6a756b0a-efc0-4f35-ae06-c136748cc784',
//         date: '8/16/2025',
//         amount: 40149,
//         category: 'Clothing',
//         name: 'Tasty Cotton Bike',
//     },
//     {
//         id: '23ffddba-96f3-4db8-bc37-e3b245554221',
//         date: '7/17/2025',
//         amount: 63750,
//         category: 'Baby',
//         name: 'Handmade Concrete Chicken',
//     },
//     {
//         id: 'af6d8a60-e784-4a3a-99fb-41ca2de52ac7',
//         date: '10/18/2025',
//         amount: 22309,
//         category: 'Baby',
//         name: 'Refined Metal Tuna',
//     },
//     {
//         id: 'f7de12b6-7548-4728-8819-599ea93282dd',
//         date: '11/19/2025',
//         amount: 66959,
//         category: 'Clothing',
//         name: 'Gorgeous Wooden Fish',
//     },
//     {
//         id: 'c904acc1-6cc8-44b3-b38d-a95f20a626b8',
//         date: '6/20/2025',
//         amount: 66999,
//         category: 'Baby',
//         name: 'Fresh Bronze Mouse',
//     },
//     {
//         id: '16abad68-7c11-4f25-8db0-f8c1d8fe528a',
//         date: '3/21/2025',
//         amount: 23325,
//         category: 'Clothing',
//         name: 'Fresh Gold Tuna',
//     },
//     {
//         id: 'f425fa8c-129c-4780-a616-ac5e7e6d3f7f',
//         date: '12/22/2025',
//         amount: 71549,
//         category: 'Baby',
//         name: 'Refined Steel Pizza',
//     },
//     {
//         id: '0cc618e8-fa57-4fc0-8731-02da24df9daf',
//         date: '1/23/2025',
//         amount: 47919,
//         category: 'Clothing',
//         name: 'Handcrafted Aluminum Bike',
//     },
//     {
//         id: '1742729665642-uie1m',
//         date: '4/24/2025',
//         amount: 900,
//         category: 'Clothing',
//         name: 'Food',
//     },
//     {
//         id: '1742729686815-v1jjy',
//         date: '5/25/2025',
//         amount: 90000,
//         category: 'Clothing',
//         name: 'Food',
//     },
//     {
//         id: 'fd67de9c-d927-425c-a106-43b27aa7b9de',
//         date: '9/26/2025',
//         amount: 49800,
//         category: 'Clothing',
//         name: 'Licensed Steel Soap',
//     },
//     {
//         id: '9f267d28-ed18-45e4-bd4d-31b3c2c3b85c',
//         date: '11/27/2025',
//         amount: 18835,
//         category: 'Tools',
//         name: 'Bespoke Bamboo Ball',
//     },
//     {
//         id: '236ad82e-c74f-4168-b507-e78c879d56f0',
//         date: '6/28/2025',
//         amount: 29709,
//         category: 'Baby',
//         name: 'Sleek Plastic Cheese',
//     },
//     {
//         id: '564250ea-13f4-4965-876a-ca4d37112769',
//         date: '10/29/2025',
//         amount: 65605,
//         category: 'Clothing',
//         name: 'Small Metal Chicken',
//     },
//     {
//         id: 'c24b0ba4-43be-4c6a-8a02-d84328dad4e5',
//         date: '3/30/2025',
//         amount: 47059,
//         category: 'Clothing',
//         name: 'Awesome Marble Gloves',
//     },
// ];

// const obj = {
//     1: { total: 0, array: [] },
//     2: { total: 0, array: [] },
//     3: { total: 0, array: [] },
//     4: { total: 0, array: [] },
//     5: { total: 0, array: [] },
//     6: { total: 0, array: [] },
//     7: { total: 0, array: [] },
//     8: { total: 0, array: [] },
//     9: { total: 0, array: [] },
//     10: { total: 0, array: [] },
//     11: { total: 0, array: [] },
//     12: { total: 0, array: [] },
// };

// for (let item of transactions) {
//     const month = item.date[0];
//     obj[month].total += item.amount;
//     obj[month].array.push(item);
// }

// for (let key in obj) {
//     obj[key].total = parseFloat((obj[key].total / 100).toFixed(2));
// }

// console.log(obj);

// // Log to console
// console.log(message);



// function getMonthRange(joinDate) {
//     const months = [];
//     const currentDate = new Date();

//     let year = joinDate.getFullYear();
//     let month = joinDate.getMonth();

//     while (year < currentDate.getFullYear() || (year === currentDate.getFullYear() && month <= currentDate.getMonth())) {
//         months.push(`${year}-${String(month + 1).padStart(2, '0')}`); // e.g., "2022-02"
//         month++;
//         if (month > 11) {
//             month = 0; // Reset to January
//             year++;
//         }
//     }
//     return months;
// }







// // Create & Update Budget Categories

// export async function createCategory(userId: string, category: Category){
//     const ref = doc(Users, userId)
//     const categoriesRef = collection(ref, "categories")
//     const docRef = doc(categoriesRef, category.id)

//     try{

//         await setDoc(docRef, {
//             id: category.id,
//             name: category.name,
//             budget: category.budget ,
//             date: serverTimestamp(),
//         } as Category)

//     }catch (err) {
//         ErrorLogger(err, "createCategory Error")
//     }
// }


// export async function updateCategory(userId: string, category: Category) {
//     const ref = doc(Users, userId)
//     const categoriesRef = collection(ref, "categories")
//     const docRef = doc(categoriesRef, category.id)

//     try {
//         await updateDoc(docRef, {
//             name: category.name,
//             budget: category.budget
//         });

//     } catch (err) {
//         ErrorLogger(err, "updateCategory Error")
//     }
// }

// export async function deleteCategory(userId: string, category: Category) {
//     try {
//         const ref = doc(Users, userId)
//         const categoriesRef = collection(ref, "categories")
//         const expensesRef = collection(ref, "expenses")
//         const docRef = doc(categoriesRef, category.id)
//         await deleteDoc(docRef);
//         console.log("Category deleted successfully");

//         const expenseQuery = query(expensesRef, where("category", "==", `${category.name}`))
//         const querySnapshot = await getDocs(expenseQuery);

//         if (!querySnapshot.empty) {

//             for (const doc of querySnapshot.docs) {
//                 const expense: Expense = doc.date()
//                 await deleteExpense(userId, expense);
//             }

//         }else {
//             console.log("no expenses to delete in this category")
//         }




//     } catch (error) {
//         console.error("Error deleting document: ", error);
//     }
// }

// export function usefetchAllCategories(user: User){
//     const [categories, setCategories] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [totalBudget, setTotalBudget] = useState(0)

//     useEffect(() => {
//         if (!user) return

//         const ref = collection(Users, user.uid, "categories");
//         setIsLoading(true)

//         const unsubscribe = onSnapshot(ref, (snapshot) => {

//             let total = 0

//             const fetchedData = snapshot.docs.map(doc => {
//                 const data = {
//                     ...doc.data(),
//                 } as Category

//                 total += data.budget

//                 return data
//             });
//             setCategories(fetchedData);
//             setTotalBudget(total)
//             setIsLoading(false)
//         })

//         return () => unsubscribe()
//     }, [user])

//     return { categories, categoriesLoading: isLoading, totalBudget}
// }

// // Create & Update Expenses

// export async function createExpense(userId: string, expense: Expense) {
//     const ref = doc(Users, userId)
//     const expensesRef = collection(ref, "expenses")
//     const docRef = doc(expensesRef, expense.id)

//     try {


//         await setDoc(docRef, {
//             id: expense.id,
//             category: expense.category,
//             name: expense.name,
//             amount: expense.amount ,
//             date: serverTimestamp(),
//         } as Expense);

//     } catch (err) {
//         ErrorLogger(err, "createExpense Error")
//     }
// }


// export async function updateExpense(userId: string, expense: Expense) {
//     const ref = doc(Users, userId)
//     const expensesRef = collection(ref, "expenses")
//     const docRef = doc(expensesRef, expense.id)

//     try {
//         await updateDoc(docRef, {
//             category: expense.category,
//             name: expense.name,
//             amount: expense.amount
//         });

//     } catch (err) {
//         ErrorLogger(err, "updateExpense Error")
//     }
// }

// export async function deleteExpense(userId: string, expense: Expense) {
//     try {
//         const ref = doc(Users, userId)
//         const expensesRef = collection(ref, "expenses")
//         const docRef = doc(expensesRef, expense.id)

//         await deleteDoc(docRef);
//         console.log("Expense deleted successfully");
//     } catch (error) {
//         console.error("Error deleting document: ", error);
//     }
// }

// // fetch all expenses
// export function usefetchAllExpenses(user: User) {
//     const [expenses, setExpenses] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [totalExpenses, setTotalExpenses] = useState(0)

//     useEffect(() => {
//         if (!user) return

//         const ref = collection(Users, user.uid, "expenses");
//         setIsLoading(true)

//         const expenseQuery = query(ref, orderBy("date", "asc"))
//         const unsubscribe = onSnapshot(expenseQuery, (snapshot) => {

//             let total = 0
//             const fetchedData = snapshot.docs.map(doc => {


//                 let data = {
//                     ...doc.data(),
//                 } as Expense

//                 data.date = data.date.toDate().toLocaleDateString('en-US')

//                 total += data.amount

//                 return { ...data }
//             });

//             setExpenses(fetchedData);
//             setTotalExpenses(total)
//             setIsLoading(false)
//         })

//         return () => unsubscribe()
//     }, [user])

//     return { expenses, expensesLoading: isLoading, totalExpenses }
// }




// const data = {
//     1: { total: 0, array: [], month: "January" },
//     2: { total: 0, array: [], month: "February" },
//     3: { total: 0, array: [], month: "March" },
//     4: { total: 0, array: [], month: "April" },
//     5: { total: 0, array: [], month: "May" },
//     6: { total: 0, array: [], month: "June" },
//     7: { total: 0, array: [], month: "July" },
//     8: { total: 0, array: [], month: "August" },
//     9: { total: 0, array: [], month: "September" },
//     10: { total: 0, array: [], month: "October" },
//     11: { total: 0, array: [], month: "November" },
//     12: { total: 0, array: [], month: "December" }
// };

// const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
// ]

// did this so i can select what month to show without calling function everytime
// data[month].total += expense.amount;
// data[month].array.push(expense);
//======================================