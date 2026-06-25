const express = require("express");
const cors = require("cors");
const beachRoutes = require("./routes/beaches");
const utilityRoutes = require("./routes/utility");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Florida Living Hub API is running" });
});

app.use("/api/beaches", beachRoutes);
app.use("/api", utilityRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
