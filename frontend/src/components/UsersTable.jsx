// function UsersTable({ users, onApprove }) {
//   return (
//     <div className="card">
//       <h3>Users</h3>

//       {users.map((u, i) => (
//         <div key={i} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
//           <img
//             src={u.photo || "https://via.placeholder.com/80"}
//             width="60"
//             height="60"
//             style={{ borderRadius: "10px" }}
//           />

//           <div>
//             {u.name} - {u.cardID} - {u.type} - {u.approved ? "Approved" : "Pending"}
//           </div>

//           {!u.approved && (
//             <button onClick={() => onApprove(u.cardID)}>Approve</button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default UsersTable;

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
