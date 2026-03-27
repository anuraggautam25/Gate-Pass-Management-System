function LogsTable({ logs }) {
  return (
    <div className="card">
      <h3>Logs</h3>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((l, i) => (
          <div key={i}>
            {l.name} - {l.type} - {l.status}
          </div>
        ))
      )}
    </div>
  );
}

export default LogsTable;