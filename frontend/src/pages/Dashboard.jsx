

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

//   // useEffect(() => {
//   //   fetchLogs();
//   // }, [search, type]);

//   useEffect(() => {
//   // initial fetch
//   fetchLogs();

//   // auto refresh every 2 seconds
//   const interval = setInterval(() => {
//     fetchLogs();
//   }, 2000);

//   // cleanup (important to avoid memory leak)
//   return () => clearInterval(interval);

//   }, [search, type]);
  

//   const exportCSV = () => {
//     let csv = "Name,CardID,Type,Status,Time\n";
//     logs.forEach((l) => {
//       csv += `${l.name},${l.cardID},${l.type},${l.status},${l.time}\n`;
//     });

//     const blob = new Blob([csv]);
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "logs.csv";
//     a.click();
//   };

//   return (
//     <div className="container">

//       <div className="card">
//         <div className="header">Dashboard Controls</div>

//         <div className="row">
//           <input
//             placeholder="Search name / card"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option>All</option>
//             <option>Employee</option>
//             <option>Visitor</option>
//             <option>Contractor</option>
//           </select>

//           <button onClick={exportCSV}>Export CSV</button>
//         </div>
//       </div>

//       <LogsTable logs={logs} onDelete={deleteLog} />
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

    const interval = setInterval(() => {
      fetchLogs();
    }, 2000);

    return () => clearInterval(interval);
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

      {/* 🔥 CENTERED MAIN TITLE */}
      <h1
        style={{
          textAlign: "center",
          color: "#f5d94e",
          marginBottom: "20px"
        }}
      >
        GAIL Gate Pass System
      </h1>

      {/* 🔥 WRAPPER FOR CENTERED CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "auto" }}>

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
    </div>
  );
}

export default Dashboard;
