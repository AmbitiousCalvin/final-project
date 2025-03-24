import { useEffect } from "react";
import useMediaQuery from "./useMediaQuery";
import { useLocalStorage } from "./useStorage";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage("useDarkMode", true);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle("__dark-theme", enabled);
  }, [enabled]);

  return [enabled, setDarkMode];
}
