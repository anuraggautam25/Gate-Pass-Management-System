function StatsCards({ logs }) {
  const allow = logs.filter(l => l.status === "ALLOW").length;
  const deny = logs.filter(l => l.status === "DENY").length;

  return (
    <div className="stats">
      <div className="card">Total: {logs.length}</div>
      <div className="card">Allowed: {allow}</div>
      <div className="card">Denied: {deny}</div>
    </div>
  );
}

export default StatsCards;