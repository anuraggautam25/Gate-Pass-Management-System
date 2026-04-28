

// import { useState } from "react";

// function UserForm({ onAdd }) {
//   const [name, setName] = useState("");
//   const [cardID, setCardID] = useState("");
//   const [type, setType] = useState("Employee");

//   const handleSubmit = () => {
//     if (!name || !cardID || !type) {
//       alert("Fill all fields");
//       return;
//     }

//     onAdd({ name, cardID, type });

//     setName("");
//     setCardID("");
//     setType("Employee");
//   };

//   return (
//     <div className="card">
//       <h3>Add New User</h3>

//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         placeholder="Card ID"
//         value={cardID}
//         onChange={(e) => setCardID(e.target.value)}
//       />

//       <select value={type} onChange={(e) => setType(e.target.value)}>
//         <option>Employee</option>
//         <option>Visitor</option>
//         <option>Contractor</option>
//       </select>

//       <button onClick={handleSubmit}>Add User</button>
//     </div>
//   );
// }

// export default UserForm;

// // export default UserForm;

import { useState } from "react";

function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [cardID, setCardID] = useState("");
  const [type, setType] = useState("Employee");
  const [idProof, setIdProof] = useState("Aadhaar");
  const [idNumber, setIdNumber] = useState("");

  const handleSubmit = () => {
    if (!name || !cardID || !type || !idProof || !idNumber) {
      alert("Fill all fields");
      return;
    }

    onAdd({ name, cardID, type, idProof, idNumber });

    setName("");
    setCardID("");
    setIdNumber("");
  };

  return (
    <div className="card">
      <h3>Add New User</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Card ID"
        value={cardID}
        onChange={(e) => setCardID(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Employee</option>
        <option>Visitor</option>
        <option>Contractor</option>
      </select>

      {/* ID PROOF */}
      <select value={idProof} onChange={(e) => setIdProof(e.target.value)}>
        <option>Aadhaar</option>
        <option>PAN</option>
        <option>Voter ID</option>
      </select>

      {/* ID NUMBER */}
      <input
        placeholder="Enter ID Number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
      />

      <button onClick={handleSubmit}>Add User</button>
    </div>
  );
}

export default UserForm;
