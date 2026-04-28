// import { useEffect, useState } from "react";
// import { getLogsFiltered, deleteLog } from "../api";
// import LogsTable from "../components/LogsTable";

// function Dashboard() {
//   const [logs, setLogs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("All");

//   const fetchLogs = async () => {
//     const data = await getLogsFiltered(search, type);
//     setLogs([...data].reverse());
//   };

//   useEffect(() => {
//     fetchLogs();
//   }, [search, type]);

//   const handleDelete = async (index) => {
//     const confirmDelete = window.confirm("Delete this log?");
//     if (!confirmDelete) return;

//     await deleteLog(index);
//     fetchLogs();
//   };

//   const exportCSV = () => {
//     let csv = "Name,CardID,Type,Status,Reason,Time\n";

//     logs.forEach((l) => {
//       csv += `${l.name},${l.cardID},${l.type},${l.status},${l.reason},${l.time}\n`;
//     });

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "logs.csv";
//     a.click();
//   };

//   return (
//     <div className="container">
//       <h2 style={{ color: "white" }}>Dashboard</h2>

//       {/* 🔍 SEARCH */}
//       <input
//         placeholder="Search by name or card ID"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* 🎯 FILTER */}
//       <select value={type} onChange={(e) => setType(e.target.value)}>
//         <option>All</option>
//         <option>Employee</option>
//         <option>Visitor</option>
//         <option>Contractor</option>
//       </select>

//       {/* 📥 EXPORT */}
//       <button onClick={exportCSV}>Export CSV</button>

//       <LogsTable logs={logs} onDelete={handleDelete} />
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

  const exportCSV = () => {
    let csv = "Name,CardID,Type,Status,Time\n";
    logs.forEach((l) => {
      csv += `${l.name},${l.cardID},${l.type},${l.status},${l.time}\n`;
    });

    const blob = new Blob([csv]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.csv";
    a.click();
  };

  return (
    <div className="container">

      <div className="card">
        <div className="header">Dashboard Controls</div>

        <div className="row">
          <input
            placeholder="Search name / card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>All</option>
            <option>Employee</option>
            <option>Visitor</option>
            <option>Contractor</option>
          </select>

          <button onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <LogsTable logs={logs} onDelete={deleteLog} />
    </div>
  );
}

export default Dashboard;
