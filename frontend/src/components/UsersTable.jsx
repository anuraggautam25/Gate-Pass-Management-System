// function UsersTable({ users, onApprove, onDelete }) {
//   return (
//     <div className="card">
//       <h3>Users</h3>

//       {users.length === 0 ? (
//         <p>No users found</p>
//       ) : (
//         users.map((u, i) => (
//           <div
//             key={u.cardID}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "10px",
//               padding: "10px",
//               borderBottom: "1px solid #444",
//               color: "white"
//             }}
//           >
//             {/* ✅ COMBINED USER INFO */}
//             <div>
//               <b>{u.name}</b> - {u.cardID} - {u.type} <br />
//               ID: {u.idProof} (****{u.idNumber?.slice(-4)}) <br />
//               Status: {u.approved ? "Approved" : "Pending"}
//             </div>

//             <div style={{ display: "flex", gap: "10px" }}>
//               {!u.approved && (
//                 <button onClick={() => onApprove(u.cardID)}>
//                   Approve
//                 </button>
//               )}

//               <button
//                 onClick={() => onDelete(u.cardID)}
//                 style={{ backgroundColor: "crimson" }}
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

// export default UsersTable;
function UsersTable({ users, onApprove, onDelete }) {
  return (
    <div className="card">
      <div className="header">Users</div>

      {users.length === 0 ? (
        <p style={{ color: "#aaa" }}>No users found</p>
      ) : (
        users.map((u) => (
          <div
            key={u.cardID}
            style={{
              background: "#1e1e2f",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
            }}
          >
            {/* TOP ROW */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {u.name}
                </div>
                <div style={{ fontSize: "13px", color: "#bbb" }}>
                  {u.type} • {u.cardID}
                </div>
              </div>

              {/* STATUS BADGE */}
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  background: u.approved ? "#2ecc71" : "#e74c3c",
                  color: "white",
                  height: "fit-content"
                }}
              >
                {u.approved ? "Approved" : "Pending"}
              </span>
            </div>

            {/* ID INFO */}
            <div style={{ marginTop: "8px", fontSize: "13px", color: "#ccc" }}>
              {u.idProof}: ****{u.idNumber?.slice(-4)}
            </div>

            {/* ACTION BUTTONS */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "10px"
              }}
            >
              {!u.approved && (
                <button
                  onClick={() => onApprove(u.cardID)}
                  style={{
                    background: "#2ecc71",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => onDelete(u.cardID)}
                style={{
                  background: "#e74c3c",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UsersTable;
