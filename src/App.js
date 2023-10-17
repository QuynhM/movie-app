import React, { useState } from "react"; // Fixed the import statement
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";
import { MyContext } from "./contexts/MyContext";
import "./index.css";

function App() {
  const [favoriteList, setFavoriteList] = useState([]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <MyContext.Provider value={{ favoriteList, setFavoriteList }}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </MyContext.Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
