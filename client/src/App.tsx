import { useEffect, useState } from "react";
import Home from "./pages/Home";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("iut-sis-theme") === "dark");

  useEffect(() => {
    localStorage.setItem("iut-sis-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={darkMode ? "theme-dark" : "theme-light"}>
      <Home
        authenticated={authenticated}
        onLogin={() => setAuthenticated(true)}
        onLogout={() => setAuthenticated(false)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((current) => !current)}
      />
    </div>
  );
}
