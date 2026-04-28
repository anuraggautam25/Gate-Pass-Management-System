// function LogsTable({ logs, onDelete }) {
//   return (
//     <div className="card">
//       <h3>RFID Logs</h3>

//       {logs.length === 0 ? (
//         <p>No logs found</p>
//       ) : (
//         logs.map((l, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               gap: "15px",
//               marginBottom: "15px",
//               borderBottom: "1px solid #444",
//               padding: "10px",
//               color: "white"
//             }}
//           >
//             <img
//               src={l.photo || "https://via.placeholder.com/80"}
//               width="80"
//               height="80"
//               style={{ borderRadius: "10px" }}
//             />

//             <div>
//               <div><b>Name:</b> {l.name}</div>
//               <div><b>Card:</b> {l.cardID}</div>
//               <div><b>Type:</b> {l.type}</div>
//               <div><b>Status:</b> {l.status}</div>
//               <div><b>Reason:</b> {l.reason}</div>
//               <div><b>Time:</b> {new Date(l.time).toLocaleString()}</div>

//               <button
//                 onClick={() => onDelete(i)}
//                 style={{ marginTop: "5px", background: "red" }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default LogsTable;

function LogsTable({ logs, onDelete }) {
  return (
    <div className="card">
      <div className="header">Access Logs</div>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "15px",
              padding: "10px",
              borderBottom: "1px solid #334155"
            }}
          >
            <img
              src={l.photo || "https://via.placeholder.com/80"}
              width="80"
              height="80"
              style={{ borderRadius: "10px" }}
            />

            <div style={{ flex: 1 }}>
              <div><b>{l.name}</b></div>
              <div>ID: {l.cardID}</div>
              <div>Type: {l.type}</div>
              <div>Status: {l.status}</div>
              <div>{new Date(l.time).toLocaleString()}</div>
            </div>

            <button
              className="danger"
              onClick={() => onDelete(i)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default LogsTable;
