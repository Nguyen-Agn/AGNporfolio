import { Router } from "express";
import { register, login, logout , getUser} from "../controllers/auth.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// trong routes/auth.routes.ts
router.get("/user", getUser);


export default router;
