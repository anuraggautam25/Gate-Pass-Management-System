

// const express = require("express");
// const router = express.Router();

// const { users, logs } = require("../data/store");


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
// // VERIFY RFID (FINAL LOGIC)
// // =========================
// router.get("/verify", (req, res) => {
//   const id = req.query.id;

//   if (!id) return res.status(400).send("DENY");

//   const user = users.find((u) => u.cardID === id);

//   // ❌ CASE 1: Card not found
//   if (!user) {
//     logs.push({
//       cardID: id,
//       name: "Unknown",
//       type: "Unknown",
//       photo: "",
//       status: "DENY",
//       reason: "Card ID not found",
//       time: new Date()
//     });

//     return res.send("DENY");
//   }

//   // ❌ CASE 2: Not approved
//   if (!user.approved) {
//     logs.push({
//       cardID: id,
//       name: user.name,
//       type: user.type,
//       photo: user.photo || "",
//       status: "DENY",
//       reason: "User not approved",
//       time: new Date()
//     });

//     return res.send("DENY");
//   }

//   // ✅ CASE 3: Approved
//   logs.push({
//     cardID: id,
//     name: user.name,
//     type: user.type,
//     photo: user.photo || "",
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
//   const { name, cardID, type, photo } = req.body;

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
//     photo: photo || "",
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
// MULTER CONFIG
// =========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  }
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
// VERIFY RFID ONLY
// =========================
router.get("/verify", (req, res) => {
  const id = req.query.id;

  if (!id) return res.status(400).send("DENY");

  const user = users.find((u) => u.cardID === id);

  // Card not found
  if (!user) {
    logs.push({
      cardID: id,
      name: "Unknown",
      type: "Unknown",
      photo: "",
      status: "DENY",
      reason: "Card ID not found",
      time: new Date()
    });

    return res.send("DENY");
  }

  // User not approved
  if (!user.approved) {
    logs.push({
      cardID: id,
      name: user.name,
      type: user.type,
      photo: "",
      status: "DENY",
      reason: "User not approved",
      time: new Date()
    });

    return res.send("DENY");
  }

  // Approved
  logs.push({
    cardID: id,
    name: user.name,
    type: user.type,
    photo: "",
    status: "ALLOW",
    reason: "Access granted",
    time: new Date()
  });

  return res.send("ALLOW");
});

// =========================
// VERIFY WITH IMAGE (ESP32-CAM)
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
      time: new Date()
    });

    return res.send("DENY");
  }

  // User not approved
  if (!user.approved) {
    logs.push({
      cardID: id,
      name: user.name,
      type: user.type,
      photo: photoURL,
      status: "DENY",
      reason: "User not approved",
      time: new Date()
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
    time: new Date()
  });

  return res.send("ALLOW");
});

// =========================
// ADD USER
// =========================
router.post("/addUser", (req, res) => {
  const { name, cardID, type } = req.body;

  if (!name || !cardID || !type) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exists = users.find((u) => u.cardID === cardID);
  if (exists) {
    return res.status(400).json({ message: "Card already exists" });
  }

  users.push({
    name,
    cardID,
    type,
    approved: false
  });

  res.json({ message: "User added" });
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
