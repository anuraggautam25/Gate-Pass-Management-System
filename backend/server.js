
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const apiRoutes = require("./routes/api");

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Gate Pass Backend is Live 🚀");
// });

// app.use("/api", apiRoutes);

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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Upload image route
app.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const baseUrl =
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

    res.json({
      success: true,
      message: "Image uploaded successfully",
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

// Existing API routes
app.use("/api", apiRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
