import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.theme === "dark"
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const html = window.document.documentElement;
    const currentTheme = isDarkMode ? "light" : "dark";
    const nextTheme = isDarkMode ? "dark" : "light";
    html.classList.remove(currentTheme);
    html.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }, [isDarkMode]);

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
