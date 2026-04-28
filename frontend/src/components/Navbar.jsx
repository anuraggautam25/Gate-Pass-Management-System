function Navbar({ setPage, setLogin, page }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src="/gail.png" alt="GAIL" className="nav-logo" />
        <div className="nav-title">GAIL Gate Pass System</div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => setPage("dashboard")}
          style={{
            background: page === "dashboard" ? "#2ecc71" : "#444",
            color: "white"
          }}
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("admin")}
          style={{
            background: page === "admin" ? "#2ecc71" : "#444",
            color: "white"
          }}
        >
          Admin
        </button>

        <button
          onClick={() => setLogin(false)}
          style={{ backgroundColor: "crimson", color: "white" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
