import "./styles/general.scss";
import "./styles/styles.scss";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLayout } from "./contexts/layoutContext";

export default function App() {
  const { setDarkMode } = useLayout();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, beatae!
      </p>
      <button className="icon-btn" onClick={() => setDarkMode(true)}>
        <FaMoon />
      </button>
      <button className="icon-btn" onClick={() => setDarkMode(false)}>
        <FaSun />
      </button>
      <button className="btn-primary">Create Budget</button>
      <button className="btn-secondary">Create Expense</button>
      <button className="btn-third">Save</button>
      <button className="btn-gray">Cancel</button>
    </div>
  );
}
