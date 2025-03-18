import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LayoutProvider } from "./contexts/layoutContext";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
  </StrictMode>
);
