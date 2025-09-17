import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.ts"
import {
  getPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfoliosId
} from "../controllers/portfolio.ts";

const router = Router();

router.get("/a", isAuthenticated ,getPortfolios);
router.get("/s/:id", isAuthenticated ,getPortfoliosId);
router.post("/", isAuthenticated, createPortfolio);
router.put("/:id",isAuthenticated, updatePortfolio);
router.delete("/:id",isAuthenticated , deletePortfolio);

export default router;
