import "./env";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import ViteExpress from "vite-express"
import authRoutes from "./routes/auth.route";
import portfolioRoutes from "./routes/portfolio.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session setup
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // bật true khi deploy HTTPS
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
