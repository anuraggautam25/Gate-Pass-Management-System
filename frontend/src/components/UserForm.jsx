// import { useState } from "react";

// function UserForm({ onAdd }) {
//   const [name, setName] = useState("");
//   const [cardID, setCardID] = useState("");
//   const [type, setType] = useState("Employee");

//   const handleSubmit = () => {
//     if (!name.trim() || !cardID.trim() || !type.trim()) {
//       alert("Please enter Name, Card ID and Type");
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
//         type="text"
//         placeholder="Enter Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Enter Card ID"
//         value={cardID}
//         onChange={(e) => setCardID(e.target.value)}
//       />

//       <select value={type} onChange={(e) => setType(e.target.value)}>
//         <option value="Employee">Employee</option>
//         <option value="Visitor">Visitor</option>
//         <option value="Contractor">Contractor</option>
//       </select>

//       <button onClick={handleSubmit}>Add User</button>
//     </div>
//   );
// }

// export default UserForm;


import { useState } from "react";

function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [cardID, setCardID] = useState("");
  const [type, setType] = useState("Employee");
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    if (!name || !cardID || !type) {
      alert("Fill all fields");
      return;
    }

    onAdd({ name, cardID, type, photo });

    setName("");
    setCardID("");
    setPhoto("");
  };

  return (
    <div className="card">
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Card ID" value={cardID} onChange={e => setCardID(e.target.value)} />

      <select value={type} onChange={e => setType(e.target.value)}>
        <option>Employee</option>
        <option>Visitor</option>
        <option>Contractor</option>
      </select>

      <input placeholder="Photo URL" value={photo} onChange={e => setPhoto(e.target.value)} />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default UserForm;
