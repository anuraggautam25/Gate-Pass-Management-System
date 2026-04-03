// const API = "https://gatepass-backend-22si.onrender.com";

// export const getUsers = () => fetch(`${API}/api/users`).then(r => r.json());
// export const getLogs = () => fetch(`${API}/api/logs`).then(r => r.json());

// export const addUser = (data) =>
//   fetch(`${API}/api/addUser`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

// export const approveUser = (cardID) =>
//   fetch(`${API}/api/approve`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ cardID }),
//   });

const API = "https://gatepass-backend-22si.onrender.com";

export const getUsers = () => fetch(`${API}/api/users`).then(r => r.json());
export const getLogs = () => fetch(`${API}/api/logs`).then(r => r.json());

export const addUser = (data) =>
  fetch(`${API}/api/addUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const approveUser = (cardID) =>
  fetch(`${API}/api/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardID }),
  });
