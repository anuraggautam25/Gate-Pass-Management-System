
// import { useEffect, useState } from "react";
// import { getLogs } from "../api";
// import StatsCards from "../components/StatsCards";
// import LogsTable from "../components/LogsTable";

// function Dashboard() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getLogs();
//         setLogs([...data].reverse());
//       } catch (error) {
//         console.error("Error fetching logs:", error);
//       }
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

import { useEffect, useState } from "react";
import { getLogsFiltered, deleteLog } from "../api";
import LogsTable from "../components/LogsTable";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const fetchLogs = async () => {
    const data = await getLogsFiltered(search, type);
    setLogs([...data].reverse());
  };

  useEffect(() => {
    fetchLogs();
  }, [search, type]);

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm("Delete this log?");
    if (!confirmDelete) return;

    await deleteLog(index);
    fetchLogs();
  };

  const exportCSV = () => {
    let csv = "Name,CardID,Type,Status,Reason,Time\n";

    logs.forEach((l) => {
      csv += `${l.name},${l.cardID},${l.type},${l.status},${l.reason},${l.time}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.csv";
    a.click();
  };

  return (
    <div className="container">
      <h2 style={{ color: "white" }}>Dashboard</h2>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search by name or card ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 FILTER */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>All</option>
        <option>Employee</option>
        <option>Visitor</option>
        <option>Contractor</option>
      </select>

      {/* 📥 EXPORT */}
      <button onClick={exportCSV}>Export CSV</button>

      <LogsTable logs={logs} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
