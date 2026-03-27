import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  const [login, setLogin] = useState(false);

  if (!login) return <Login setLogin={setLogin} />;

  return (
    <div>
      <Navbar />
      <Dashboard />
      <Admin />
    </div>
  );
}

export default App;