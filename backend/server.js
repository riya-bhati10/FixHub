const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const serviceRoutes = require("./routes/service.routes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
