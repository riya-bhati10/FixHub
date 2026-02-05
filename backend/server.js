const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();


const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const serviceRoutes = require("./routes/service.routes");
const bookingRoutes = require("./routes/booking.routes");
const notificationRoutes = require("./routes/notification.routes");
const reviewRoutes = require("./routes/review.routes");
const userRoutes = require("./routes/user.routes");
const technicianRoutes = require("./routes/technician.routes");

dotenv.config();
connectDB();


const corsOptions = {
    origin: [
        "https://fix-hub-ten.vercel.app",
        "https://fix-facehnvuw-riya-bhatis-projects.vercel.app",
        "https://fix-du6x8q0p9-riya-bhatis-projects.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    preflightContinue: false
}
app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/admin",adminRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});


app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
