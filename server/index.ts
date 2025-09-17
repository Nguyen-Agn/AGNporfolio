
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import ViteExpress from "vite-express"
import authRoutes from "./routes/auth.route";
import portfolioRoutes from "./routes/portfolio.route";
import MongoStore from 'connect-mongo'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60, // session 14 ngày
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true nếu https
      maxAge: 1000 * 60 * 60 * 24, // 1 ngày
    },
  }));

// health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// dùng routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolios", portfolioRoutes);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log(" MongoDB connected Succussfully");
    const port = Number(process.env.PORT) || 3000;
    ViteExpress.listen(app, port, () =>
      console.log(`Server + Vite running on http://localhost:${port}`)
    );    
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();
