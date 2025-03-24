import { useEffect } from "react";

export function useClickInside(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && ref.current.contains(event.target)) {
        console.log("Clicked inside");
        callback(event);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}

export function useClickOutside(ref, callback) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handleClick(event) {
      if (node.nodeName == "DIALOG") {
        let rect = node.getBoundingClientRect();
        let isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
          node.close();
        }
        return;
      }
      if (node && !node.contains(event.target)) {
        console.log("Clicked outside");
        callback(event);
      }
    }

    const target = node.nodeName == "DIALOG" ? node : document;
    target.addEventListener("click", handleClick);

    return () => {
      target.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}
