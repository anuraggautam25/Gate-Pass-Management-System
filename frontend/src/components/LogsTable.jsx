// function LogsTable({ logs }) {
//   return (
//     <div className="card">
//       <h3>Logs</h3>

//       {logs.length === 0 ? (
//         <p>No logs found</p>
//       ) : (
//         logs.map((l, i) => (
//           <div key={i}>
//             {l.name} - {l.type} - {l.status}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default LogsTable;

function LogsTable({ logs }) {
  return (
    <div className="card">
      <h3>RFID Logs</h3>

      {logs.map((l, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          
          <img
            src={l.photo || "https://via.placeholder.com/80"}
            width="70"
            height="70"
            style={{ borderRadius: "10px" }}
          />

          <div>
            <div><b>Name:</b> {l.name}</div>
            <div><b>Card:</b> {l.cardID}</div>
            <div><b>Type:</b> {l.type}</div>
            <div><b>Status:</b> {l.status}</div>
            <div><b>Reason:</b> {l.reason}</div>
            <div><b>Time:</b> {new Date(l.time).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LogsTable;
