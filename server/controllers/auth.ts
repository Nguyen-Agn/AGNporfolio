import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

// Đăng ký
export async function register(req: Request, res: Response) {
  console.log(req.body);
  try {
    const { email, password, firstName, lastName } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ email, password, firstName, lastName });
    await user.save();

    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
}

// Đăng nhập
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials A" });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(req.body, user.password, isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials B" });

    //  Lưu user vào session
    (req.session as any).user = { id: user._id, email: user.email };

    return res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
}

// Đăng xuất
export async function logout(req: Request, res: Response) {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Xóa cookie session
      res.json({ message: "Logged out" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Error logging out" });
  }
}
export const getUser = async (req: Request, res: Response) => {
  if (!(req.session as any).user) {
    return res.status(401).json(null);
  }
  res.json((req.session as any).user);
}