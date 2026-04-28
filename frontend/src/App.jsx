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
  const [page, setPage] = useState("dashboard"); // simple navigation

  // Login screen
  if (!login) return <Login setLogin={setLogin} />;

  return (
    <>
      <Navbar setPage={setPage} />

      {/* PAGE SWITCHING */}
      {page === "dashboard" && <Dashboard />}
      {page === "admin" && <Admin />}
    </>
  );
}

export default App;
