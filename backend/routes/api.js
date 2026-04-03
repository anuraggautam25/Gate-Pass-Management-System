// const express = require("express");
// const router = express.Router();

// const { users, logs } = require("../data/store");
// // const sendEmail = require("../services/emailService");
// // const sendSMS = require("../services/smsService");


// // =========================
// // LOGIN (Simple Admin Login)
// // =========================
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === "admin" && password === "1234") {
//     return res.json({ success: true, message: "Login successful" });
//   }

//   return res.status(401).json({ success: false, message: "Invalid credentials" });
// });

// // =========================
// // VERIFY CARD (ESP32)
// // =========================

// router.get("/verify", (req, res) => {
//   const id = req.query.id;

//   if (!id) {
//     return res.status(400).send("DENY");
//   }

//   // Find user by scanned card ID
//   const user = users.find((u) => u.cardID === id);

//   // CASE 1: Card not found → DENY
//   if (!user) {
//     const deniedLog = {
//       cardID: id,
//       name: "Unknown",
//       type: "Unknown",
//       status: "DENY",
//       reason: "Card ID not found",
//       time: new Date()
//     };

//     logs.push(deniedLog);
//     return res.send("DENY");
//   }

//   // CASE 2: Card found but not approved → DENY
//   if (!user.approved) {
//     const deniedLog = {
//       cardID: id,
//       name: user.name,
//       type: user.type,
//       status: "DENY",
//       reason: "User not approved",
//       time: new Date()
//     };

//     logs.push(deniedLog);
//     return res.send("DENY");
//   }

//   // CASE 3: Card found and approved → ALLOW
//   const allowLog = {
//     cardID: id,
//     name: user.name,
//     type: user.type,
//     status: "ALLOW",
//     reason: "Access granted",
//     time: new Date()
//   };

//   logs.push(allowLog);
//   return res.send("ALLOW");
// });



// // router.get("/verify", async (req, res) => {
// //   const id = req.query.id;

// //   const user = users.find((u) => u.cardID === id);

// //   if (user && user.approved) {
// //     const log = {
// //       name: user.name,
// //       type: user.type,
// //       status: "ALLOW",
// //       time: new Date()
// //     };

// //     logs.push(log);

//     ///// Optional notifications
//     // await sendEmail(
//     //   user.email,
//     //   "Gate Access Granted",
//     //   `${user.name} has entered through the gate successfully.`
//     // );

//     // await sendSMS(
//     //   user.phone,
//     //   `${user.name} has entered the gate successfully.`
//     ///// );

//   //    return res.send("ALLOW");
//   // }

//   // const deniedLog = {
//   //   name: user ? user.name : "Unknown",
//   //   type: user ? user.type : "Unknown",
//   //   status: "DENY",
//   //   time: new Date()
//   // };

//   // logs.push(deniedLog);

// ////   if (user) {
// //     await sendEmail(
// //       user.email,
// //       "Gate Access Denied",
// //       `${user.name} attempted access but is not yet approved.`
// //     );

// //     await sendSMS(
// //       user.phone,
// //       `${user.name} attempted gate access but is not approved.`
// //     );
// ////   }

// //   return res.send("DENY");
// // });


// // =========================
// // ADD USER
// // =========================
// // router.post("/addUser", (req, res) => {
// //   const { name, cardID, email, phone } = req.body;

// //   if (!name || !cardID) {
// //     return res.status(400).json({ message: "Name and Card ID are required" });
// //   }

// //   const existing = users.find((u) => u.cardID === cardID);

// //   if (existing) {
// //     return res.status(400).json({ message: "Card already exists" });
// //   }

// //   users.push({
// //     name,
// //     cardID,
// //     approved: false,
// //     email: email || "",
// //     phone: phone || ""
// //   });

// //   res.json({ message: "User added successfully (Pending Approval)" });
// // });
// router.post("/addUser", (req, res) => {
//   const { name, cardID, type, email, phone } = req.body;

//   if (!name || !cardID || !type) {
//     return res.status(400).json({ message: "Name, Card ID and Type are required" });
//   }

//   const existing = users.find((u) => u.cardID === cardID);

//   if (existing) {
//     return res.status(400).json({ message: "Card already exists" });
//   }

//   users.push({
//     name,
//     cardID,
//     type,
//     approved: false,
//     email: email || "",
//     phone: phone || ""
//   });

//   res.json({ message: "User added successfully (Pending Approval)" });
// });


// // =========================
// // APPROVE USER
// // =========================
// router.post("/approve", (req, res) => {
//   const { cardID } = req.body;

//   const user = users.find((u) => u.cardID === cardID);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   user.approved = true;

//   res.json({ message: "User approved successfully" });
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

const { users, logs } = require("../data/store");


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
// VERIFY RFID (FINAL LOGIC)
// =========================
router.get("/verify", (req, res) => {
  const id = req.query.id;

  if (!id) return res.status(400).send("DENY");

  const user = users.find((u) => u.cardID === id);

  // ❌ CASE 1: Card not found
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

  // ❌ CASE 2: Not approved
  if (!user.approved) {
    logs.push({
      cardID: id,
      name: user.name,
      type: user.type,
      photo: user.photo || "",
      status: "DENY",
      reason: "User not approved",
      time: new Date()
    });

    return res.send("DENY");
  }

  // ✅ CASE 3: Approved
  logs.push({
    cardID: id,
    name: user.name,
    type: user.type,
    photo: user.photo || "",
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
  const { name, cardID, type, photo } = req.body;

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
    photo: photo || "",
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
