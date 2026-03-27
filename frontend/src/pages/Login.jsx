function Login({ setLogin }) {
  return (
    <div className="center">
      <div className="card">
        <h2>Login</h2>
        <button onClick={() => setLogin(true)}>Login</button>
      </div>
    </div>
  );
}

export default Login;