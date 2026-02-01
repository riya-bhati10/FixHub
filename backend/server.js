const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();


const authRoutes = require("./routes/auth.Routes");
const adminRoutes = require("./routes/admin.routes");
const serviceRoutes = require("./routes/service.routes");
const bookingRoutes = require("./routes/booking.routes");
const notificationRoutes = require("./routes/notification.routes");
const reviewRoutes = require("./routes/review.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();
connectDB();


const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
