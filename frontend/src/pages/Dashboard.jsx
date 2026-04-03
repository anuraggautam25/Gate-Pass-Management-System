// import { useEffect, useState } from "react";
// import { getLogs } from "../api";
// import StatsCards from "../components/StatsCards";
// import LogsTable from "../components/LogsTable";

// function Dashboard() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getLogs();
//       setLogs(data);
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="container">
//       <StatsCards logs={logs} />
//       <LogsTable logs={logs} />
//     </div>
//   );
// }

// export default Dashboard;

function UsersTable({ users, onApprove }) {
  return (
    <div className="card">
      <h3>Users</h3>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px"
            }}
          >
            <div>
              {u.name} - {u.cardID} - {u.type} -{" "}
              {u.approved ? "Approved" : "Pending"}
            </div>

            {!u.approved && (
              <button onClick={() => onApprove(u.cardID)}>Approve</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UsersTable;
