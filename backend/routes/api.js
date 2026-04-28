


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const { users, logs } = require("../data/store");

// // =========================
// // MULTER CONFIG
// // =========================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1E9) +
//       path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// // =========================
// // LOGIN
// // =========================
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === "admin" && password === "1234") {
//     return res.json({ success: true });
//   }

//   return res.status(401).json({ success: false });
// });

// // =========================
// // VERIFY RFID ONLY (NO LOGGING)
// // =========================
// router.get("/verify", (req, res) => {
//   const id = req.query.id;

//   if (!id) return res.status(400).send("DENY");

//   const user = users.find((u) => u.cardID === id);

//   if (!user) return res.send("DENY");
//   if (!user.approved) return res.send("DENY");

//   return res.send("ALLOW");
// });

// // =========================
// // VERIFY WITH IMAGE (ONLY LOGGING HERE)
// // =========================
// router.post("/verifyWithImage", upload.single("photo"), (req, res) => {
//   const id = req.body.cardID;

//   if (!id) return res.status(400).send("DENY");

//   const user = users.find((u) => u.cardID === id);

//   const photoURL = req.file
//     ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
//     : "";

//   // Card not found
//   if (!user) {
//     logs.push({
//       cardID: id,
//       name: "Unknown",
//       type: "Unknown",
//       photo: photoURL,
//       status: "DENY",
//       reason: "Card ID not found",
//       time: new Date()
//     });

//     return res.send("DENY");
//   }

//   // Not approved
//   if (!user.approved) {
//     logs.push({
//       cardID: id,
//       name: user.name,
//       type: user.type,
//       photo: photoURL,
//       status: "DENY",
//       reason: "User not approved",
//       time: new Date()
//     });

//     return res.send("DENY");
//   }

//   // Approved
//   logs.push({
//     cardID: id,
//     name: user.name,
//     type: user.type,
//     photo: photoURL,
//     status: "ALLOW",
//     reason: "Access granted",
//     time: new Date()
//   });

//   return res.send("ALLOW");
// });

// // =========================
// // ADD USER
// // =========================
// router.post("/addUser", (req, res) => {
//   const { name, cardID, type } = req.body;

//   if (!name || !cardID || !type) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   const exists = users.find((u) => u.cardID === cardID);
//   if (exists) {
//     return res.status(400).json({ message: "Card already exists" });
//   }

//   users.push({
//     name,
//     cardID,
//     type,
//     approved: false
//   });

//   res.json({ message: "User added" });
// });

// // =========================
// // APPROVE USER
// // =========================
// router.post("/approve", (req, res) => {
//   const { cardID } = req.body;

//   const user = users.find((u) => u.cardID === cardID);

//   if (!user) return res.status(404).json({ message: "User not found" });

//   user.approved = true;

//   res.json({ message: "Approved" });
// });

// // =========================
// // DELETE USER
// // =========================
// router.post("/deleteUser", (req, res) => {
//   const { cardID } = req.body;

//   const index = users.findIndex((u) => u.cardID === cardID);

//   if (index === -1) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   users.splice(index, 1);

//   res.json({ message: "User deleted" });
// });

// // =========================
// // CLEAR LOGS
// // =========================
// router.post("/clearLogs", (req, res) => {
//   logs.length = 0;
//   res.json({ message: "All logs cleared" });
// });

// // =========================
// // GET USERS
// // =========================
// router.get("/users", (req, res) => {
//   res.json(users);
// });

// // =========================
// // GET LOGS
// // =========================
// router.get("/logs", (req, res) => {
//   res.json(logs);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { users, logs } = require("../data/store");

// =========================
// ID VALIDATION FUNCTION
// =========================
function validateID(idProof, idNumber) {
  if (!idProof || !idNumber) return false;

  idNumber = idNumber.trim().toUpperCase();

  switch (idProof) {
    case "Aadhaar":
      return /^[0-9]{12}$/.test(idNumber);

    case "PAN":
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(idNumber);

    case "Voter ID":
      return /^[A-Z]{3}[0-9]{7}$/.test(idNumber);

    default:
      return false;
  }
}

// =========================
// MULTER CONFIG
// =========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// =========================
// LOGIN
// =========================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
});

// =========================
// VERIFY RFID ONLY (NO LOGGING)
// =========================
router.get("/verify", (req, res) => {
  const id = req.query.id;

  if (!id) return res.status(400).send("DENY");

  const user = users.find((u) => u.cardID === id);

  if (!user) return res.send("DENY");
  if (!user.approved) return res.send("DENY");

  return res.send("ALLOW");
});

// =========================
// VERIFY WITH IMAGE (LOGGING)
// =========================
router.post("/verifyWithImage", upload.single("photo"), (req, res) => {
  const id = req.body.cardID;

  if (!id) return res.status(400).send("DENY");

  const user = users.find((u) => u.cardID === id);

  const photoURL = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : "";

  // Card not found
  if (!user) {
    logs.push({
      cardID: id,
      name: "Unknown",
      type: "Unknown",
      photo: photoURL,
      status: "DENY",
      reason: "Card ID not found",
      time: new Date(),
    });

    return res.send("DENY");
  }

  // Not approved
  if (!user.approved) {
    logs.push({
      cardID: id,
      name: user.name,
      type: user.type,
      photo: photoURL,
      status: "DENY",
      reason: "User not approved",
      time: new Date(),
    });

    return res.send("DENY");
  }

  // Approved
  logs.push({
    cardID: id,
    name: user.name,
    type: user.type,
    photo: photoURL,
    status: "ALLOW",
    reason: "Access granted",
    time: new Date(),
  });

  return res.send("ALLOW");
});

// =========================
// ADD USER (UPDATED WITH ID VALIDATION)
// =========================
router.post("/addUser", (req, res) => {
  const { name, cardID, type, idProof, idNumber } = req.body;

  if (!name || !cardID || !type || !idProof || !idNumber) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Duplicate card check
  const exists = users.find((u) => u.cardID === cardID);
  if (exists) {
    return res.status(400).json({ message: "Card already exists" });
  }

  // ✅ Validate ID proof
  if (!validateID(idProof, idNumber)) {
    return res.status(400).json({ message: "Invalid ID proof format" });
  }

  users.push({
    name,
    cardID,
    type,
    idProof,
    idNumber,
    approved: false,
  });

  res.json({ message: "User added successfully" });
});

// =========================
// APPROVE USER
// =========================
router.post("/approve", (req, res) => {
  const { cardID } = req.body;

  const user = users.find((u) => u.cardID === cardID);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.approved = true;

  res.json({ message: "Approved" });
});

// =========================
// DELETE USER
// =========================
router.post("/deleteUser", (req, res) => {
  const { cardID } = req.body;

  const index = users.findIndex((u) => u.cardID === cardID);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.json({ message: "User deleted" });
});

// =========================
// CLEAR LOGS
// =========================
router.post("/clearLogs", (req, res) => {
  logs.length = 0;
  res.json({ message: "All logs cleared" });
});

// =========================
// GET USERS
// =========================
router.get("/users", (req, res) => {
  res.json(users);
});

// =========================
// GET LOGS
// =========================
router.get("/logs", (req, res) => {
  res.json(logs);
});

module.exports = router;
