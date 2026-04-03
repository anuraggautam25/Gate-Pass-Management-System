
// import { useState } from "react";

// function UserForm({ onAdd }) {
//   const [name, setName] = useState("");
//   const [cardID, setCardID] = useState("");
//   const [type, setType] = useState("Employee");
//   const [photo, setPhoto] = useState("");

//   const handleSubmit = () => {
//     if (!name || !cardID || !type) {
//       alert("Fill all fields");
//       return;
//     }

//     onAdd({ name, cardID, type, photo });

//     setName("");
//     setCardID("");
//     setPhoto("");
//   };

//   return (
//     <div className="card">
//       <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//       <input placeholder="Card ID" value={cardID} onChange={e => setCardID(e.target.value)} />

//       <select value={type} onChange={e => setType(e.target.value)}>
//         <option>Employee</option>
//         <option>Visitor</option>
//         <option>Contractor</option>
//       </select>

//       <input placeholder="Photo URL" value={photo} onChange={e => setPhoto(e.target.value)} />

//       <button onClick={handleSubmit}>Add</button>
//     </div>
//   );
// }

import { useState } from "react";

function UserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [cardID, setCardID] = useState("");
  const [type, setType] = useState("Employee");

  const handleSubmit = () => {
    if (!name || !cardID || !type) {
      alert("Fill all fields");
      return;
    }

    onAdd({ name, cardID, type });

    setName("");
    setCardID("");
    setType("Employee");
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

      <button onClick={handleSubmit}>Add User</button>
    </div>
  );
}

export default UserForm;

// export default UserForm;
