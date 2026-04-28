// import { useState } from "react";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Admin from "./pages/Admin";
// import Navbar from "./components/Navbar";


// function App() {
//   const [login, setLogin] = useState(false);

//   if (!login) return <Login setLogin={setLogin} />;

//   return (
//     <div>
//       <Navbar />
//       <Dashboard />
//       <Admin />
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  const [login, setLogin] = useState(false);
  const [page, setPage] = useState("dashboard");

  // If not logged in → show login page
  if (!login) return <Login onLogin={() => setLogin(true)} />;

  return (
    <>
      {/* ✅ HERE is where you put it */}
      <Navbar setPage={setPage} setLogin={setLogin} page={page} />

      {/* Page rendering */}
      {page === "dashboard" && <Dashboard />}
      {page === "admin" && <Admin />}
    </>
  );
}

export default App;
