import React from "react";
import theme from "../Containers/Theme/Theme";

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
