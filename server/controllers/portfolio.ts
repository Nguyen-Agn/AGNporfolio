import { Request, Response } from "express";
import { Portfolio } from "../models/portfolio";

// Lấy tất cả portfolio của user hiện tại
export async function getPortfolios(req: Request, res: Response) {
  const user = (req.session as any).user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  console.log("Đã tải thành công")
  const portfolios = await Portfolio.find({ userId: user.id });
  res.json(portfolios);
}

// Lấy cá nhân portfolio
export async function getPortfoliosId(req: Request, res: Response) {
  if (req.params.id ===  "undefined") res.json("Error id");
  const user = (req.session as any).user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  console.log("Đã tải đơn thành công")
  const portfolios = await Portfolio.findById(req.params.id);
  console.log(portfolios)
  res.json(portfolios);
}

// Tạo mới portfolio
export async function createPortfolio(req: Request, res: Response) {
  const user = (req.session as any).user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { title, description, content, template } = req.body;
  const portfolio = new Portfolio({
    userId: user.id,
    title,
    description,
    content,
    template,
  });

  await portfolio.save();
  console.log("PORTFOLIO đã tạo thành công")
  res.json(portfolio);
}

// Cập nhật portfolio
export async function updatePortfolio(req: Request, res: Response) {
  const user = (req.session as any).user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  console.log("Đã cập nhật portfolio")
  const { id } = req.params;
  const updated = await Portfolio.findOneAndUpdate(
    { _id: id, userId: user.id },
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Portfolio not found" });
  res.json(updated);
}

// Xóa portfolio
export async function deletePortfolio(req: Request, res: Response) {
  const user = (req.session as any).user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  console.log("Xóa Portfolio thành công")
  const { id } = req.params;
  const deleted = await Portfolio.findOneAndDelete({ _id: id, userId: user.id });

  if (!deleted) return res.status(404).json({ message: "Portfolio not found" });
  res.json({ message: "Portfolio deleted" });
}
