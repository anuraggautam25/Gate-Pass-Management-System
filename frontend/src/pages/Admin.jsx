// import { useEffect, useState } from "react";
// import { getUsers, addUser, approveUser, deleteUser, clearLogs } from "../api";
// import UserForm from "../components/UserForm";
// import UsersTable from "../components/UsersTable";

// function Admin() {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleAddUser = async (user) => {
//     await addUser(user);
//     fetchUsers();
//   };

//   const handleApprove = async (cardID) => {
//     await approveUser(cardID);
//     fetchUsers();
//   };

//   const handleDelete = async (cardID) => {
//     const confirmDelete = window.confirm("Delete this user?");
//     if (!confirmDelete) return;

//     await deleteUser(cardID);
//     fetchUsers();
//   };

//   const handleClearLogs = async () => {
//     const confirmClear = window.confirm("Clear all logs?");
//     if (!confirmClear) return;

//     await clearLogs();
//     alert("Logs cleared");
//   };

//   return (
//     <div className="container">
//       <h2 style={{ color: "white", marginBottom: "20px" }}>Admin Panel</h2>

//       <UserForm onAdd={handleAddUser} />

//       <button
//         onClick={handleClearLogs}
//         style={{
//           marginBottom: "20px",
//           backgroundColor: "orange",
//           color: "black"
//         }}
//       >
//         Clear All Logs
//       </button>

//       <UsersTable
//         users={users}
//         onApprove={handleApprove}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getUsers, addUser, approveUser, deleteUser, clearLogs } from "../api";
import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";

function Admin() {
  const [users, setUsers] = useState([]);

  // Fetch users
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

  // ✅ Add user + refresh
  const handleAddUser = async (user) => {
    await addUser(user);
    fetchUsers();
  };

  // ✅ Approve + refresh
  const handleApprove = async (cardID) => {
    await approveUser(cardID);
    fetchUsers();
  };

  // ✅ Delete with confirmation
  const handleDelete = async (cardID) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    await deleteUser(cardID);
    fetchUsers();
  };

  // ✅ Clear logs with confirmation
  const handleClearLogs = async () => {
    const confirmClear = window.confirm("Clear all logs?");
    if (!confirmClear) return;

    await clearLogs();
    alert("Logs cleared");
  };

  return (
    <div className="container">

      {/* Admin Controls */}
      <div className="card">
        <div className="header">Admin Controls</div>

        <button onClick={handleClearLogs}>
          Clear Logs
        </button>
      </div>

      {/* Layout */}
      <div className="row">
        <div className="col">
          <UserForm onAdd={handleAddUser} />
        </div>

        <div className="col">
          <UsersTable
            users={users}
            onApprove={handleApprove}
            onDelete={handleDelete}
          />
        </div>
      </div>

    </div>
  );
}

export default Admin;

// export default Admin;
