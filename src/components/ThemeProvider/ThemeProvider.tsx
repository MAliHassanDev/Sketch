import ThemeContext, { Theme } from "@/contexts/themeContext";
import {useEffect, useState,  } from "react";






type ThemeProviderProps = {
  children: React.JSX.Element[] | React.JSX.Element
}
const ThemeProvider = ({children}:ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getTheme());
  

  useEffect(() => {
    localStorage.setItem("sketchTheme", theme);
  },[theme]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={
      {
        theme,
        setTheme,
        toggleTheme
      }
    }
    >
      {children}
    </ThemeContext.Provider>
  );
};




function getTheme() {
  const theme = localStorage.getItem("sketchTheme");
  if (!theme) {
    const defaultTheme:Theme = "light";
    localStorage.setItem("sketchTheme", defaultTheme);
    return defaultTheme;
  } else {
    return theme as Theme;
  }
}


export  {ThemeProvider,ThemeContext};