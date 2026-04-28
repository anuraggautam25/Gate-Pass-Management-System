function LogsTable({ logs }) {
  return (
    <div className="card">
      <h3>RFID Access Logs</h3>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginBottom: "15px",
              padding: "10px",
              borderBottom: "1px solid #444"
            }}
          >
            <img
              src={l.photo || "https://via.placeholder.com/80?text=No+Photo"}
              alt={l.name}
              width="80"
              height="80"
              style={{
                borderRadius: "10px",
                objectFit: "cover"
              }}
            />

            <div style={{ textAlign: "left" }}>
              <div><b>Name:</b> {l.name}</div>
              <div><b>Card ID:</b> {l.cardID}</div>
              <div><b>Type:</b> {l.type}</div>
              <div><b>ID:</b> {l.idProof} ({l.idNumber})</div>
              <div><b>Status:</b> {l.status}</div>
              <div><b>Reason:</b> {l.reason}</div>
              <div><b>Time:</b> {new Date(l.time).toLocaleString()}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LogsTable;
