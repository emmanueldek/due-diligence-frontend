import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleOutside = () => {
      callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleOutside);
    };
  }, [callback]);

  return rootRef;
};
