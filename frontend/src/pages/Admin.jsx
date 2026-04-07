// import { useEffect, useState } from "react";
// import { getUsers, addUser, approveUser } from "../api";
// import UserForm from "../components/UserForm";
// import UsersTable from "../components/UsersTable";

// function Admin() {
//   const [users, setUsers] = useState([]);

//   const load = async () => {
//     const data = await getUsers();
//     setUsers(data);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="container">
//       <UserForm onAdd={async (d) => { await addUser(d); load(); }} />
//       <UsersTable users={users} onApprove={async (id) => { await approveUser(id); load(); }} />
//     </div>
//   );
// }

// export default Admin;

import { useEffect, useState } from "react";
import { getUsers, addUser, approveUser, deleteUser, clearLogs } from "../api";
import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";

function Admin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    await addUser(user);
    fetchUsers();
  };

  const handleApprove = async (cardID) => {
    await approveUser(cardID);
    fetchUsers();
  };

  const handleDelete = async (cardID) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    await deleteUser(cardID);
    fetchUsers();
  };

  const handleClearLogs = async () => {
    const confirmClear = window.confirm("Clear all logs?");
    if (!confirmClear) return;

    await clearLogs();
    alert("Logs cleared");
  };

  return (
    <div className="container">
      <h2 style={{ color: "white", marginBottom: "20px" }}>Admin Panel</h2>

      <UserForm onAdd={handleAddUser} />

      <button
        onClick={handleClearLogs}
        style={{
          marginBottom: "20px",
          backgroundColor: "orange",
          color: "black"
        }}
      >
        Clear All Logs
      </button>

      <UsersTable
        users={users}
        onApprove={handleApprove}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Admin;
