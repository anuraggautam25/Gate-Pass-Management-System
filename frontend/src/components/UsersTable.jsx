function UsersTable({ users, onApprove }) {
  return (
    <div className="card">
      <h3>Users List</h3>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{u.name}</strong> - {u.cardID} - {u.type} -{" "}
            {u.approved ? "Approved" : "Pending"}

            {!u.approved && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => onApprove(u.cardID)}
              >
                Approve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UsersTable;