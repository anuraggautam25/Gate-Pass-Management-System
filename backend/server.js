// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const apiRoutes = require("./routes/api");

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/api", apiRoutes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Gate Pass Backend is Live 🚀");
});

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
