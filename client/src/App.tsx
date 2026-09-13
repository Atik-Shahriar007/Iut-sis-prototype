import { useState } from "react";
import Home from "./pages/Home";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Home
      authenticated={authenticated}
      onLogin={() => setAuthenticated(true)}
      onLogout={() => setAuthenticated(false)}
    />
  );
}
