
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const apiRoutes = require("./routes/api");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Ensure uploads folder exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// // Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// // Upload image route
// app.post("/upload-image", upload.single("image"), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded"
//       });
//     }

//     const baseUrl =
//       process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

//     res.json({
//       success: true,
//       message: "Image uploaded successfully",
//       filename: req.file.filename,
//       imageUrl: `${baseUrl}/uploads/${req.file.filename}`
//     });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error"
//     });
//   }
// });

// // Existing API routes
// app.use("/api", apiRoutes);

// // Home route
// app.get("/", (req, res) => {
//   res.send("Backend running...");
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(express.json({ limit: "15mb" }));   // important for ESP32 image
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// =========================
// CREATE UPLOADS FOLDER
// =========================
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Uploads folder created");
}

// =========================
// SERVE UPLOADED IMAGES
// =========================
app.use("/uploads", express.static(uploadDir));

// =========================
// MULTER CONFIG
// =========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// =========================
// OPTIONAL TEST ROUTE
// =========================
app.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const baseUrl =
      process.env.BASE_URL ||
      `http://localhost:${process.env.PORT || 3000}`;

    res.json({
      success: true,
      filename: req.file.filename,
      imageUrl: `${baseUrl}/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// =========================
// API ROUTES (IMPORTANT)
// =========================
app.use("/api", apiRoutes);

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
  res.send("Gate Pass Backend is Live 🚀");
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


