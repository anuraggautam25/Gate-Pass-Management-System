// function UsersTable({ users, onApprove }) {
//   return (
//     <div className="card">
//       <h3>Users</h3>

//       {users.length === 0 ? (
//         <p>No users found</p>
//       ) : (
//         users.map((u, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               gap: "10px",
//               alignItems: "center",
//               marginBottom: "10px"
//             }}
//           >
//             <div>
//               {u.name} - {u.cardID} - {u.type} -{" "}
//               {u.approved ? "Approved" : "Pending"}
//             </div>

//             {!u.approved && (
//               <button onClick={() => onApprove(u.cardID)}>Approve</button>
//             )}
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
      <h3>Users</h3>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              borderBottom: "1px solid #444",
              color: "white"
            }}
          >
            <div>
              <b>{u.name}</b> - {u.cardID} - {u.type} -{" "}
              {u.approved ? "Approved" : "Pending"}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {!u.approved && (
                <button onClick={() => onApprove(u.cardID)}>Approve</button>
              )}

              <button
                onClick={() => onDelete(u.cardID)}
                style={{ backgroundColor: "crimson" }}
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
