// function Login({ setLogin }) {
//   return (
//     <div className="center">
//       <div className="card">
//         <h2>Login</h2>
//         <button onClick={() => setLogin(true)}>Login</button>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { loginAdmin } from "../api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await loginAdmin({ username, password });
    if (res.ok) onLogin();
    else alert("Invalid credentials");
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <img src="/gail.png" style={{ width: "140px", marginTop: "30px" }} />

      <h2 style={{ color: "#f5d94e" }}>
        GAIL Gate Pass System
      </h2>

      <div className="card" style={{ maxWidth: "350px", margin: "auto" }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
