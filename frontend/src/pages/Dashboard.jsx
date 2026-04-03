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
import { useEffect, useState } from "react";
import { getLogs } from "../api";
import StatsCards from "../components/StatsCards";
import LogsTable from "../components/LogsTable";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLogs();
        setLogs([...data].reverse());
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <StatsCards logs={logs} />
      <LogsTable logs={logs} />
    </div>
  );
}

export default Dashboard;
