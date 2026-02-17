const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Student = require("./models/Student");
const connectDb = require("./config/db");
const sessionRoutes = require("./routes/sessionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return;

  const existing = await Student.findOne({ email: adminEmail });
  if (existing) return;

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await Student.create({
    name: "Admin",
    email: adminEmail,
    passwordHash,
    role: "admin"
  });
  console.log("Admin user created");
};

connectDb().then(ensureAdminUser);

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ status: "AI Evaluation Platform API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
