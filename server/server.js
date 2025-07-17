require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

// 1. Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(mongoSanitize());
app.use(hpp());

// 2. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
if (process.env.NODE_ENV === "production") {
  app.use(limiter);
}

// 3. Body Parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 5. Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 6. Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ MongoDB connection established"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// 7. Routes
const apiRoutes = express.Router();
const authRoutes = require("./routes/auth");

apiRoutes.use("/profile", require("./routes/profile"));
apiRoutes.use("/publications", require("./routes/publications"));
apiRoutes.use("/education", require("./routes/education"));
apiRoutes.use("/experience", require("./routes/experience"));

app.use("/api/v1", apiRoutes);
app.use("/api/auth", authRoutes);

// 8. Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
  });
});

// 9. 404 Handler
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err); // Forward to error handler
});

// 10. Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// 11. Server Setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 12. Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});

// 13. Handle SIGTERM
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => console.log("💤 Process terminated"));
});
