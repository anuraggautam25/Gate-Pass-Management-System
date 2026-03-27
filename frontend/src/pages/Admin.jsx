import { useEffect, useState } from "react";
import { getUsers, addUser, approveUser } from "../api";
import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";

function Admin() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <UserForm onAdd={async (d) => { await addUser(d); load(); }} />
      <UsersTable users={users} onApprove={async (id) => { await approveUser(id); load(); }} />
    </div>
  );
}

export default Admin;