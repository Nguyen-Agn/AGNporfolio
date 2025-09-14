import {
  users,
  portfolios,
  type User,
  type UpsertUser,
  type Portfolio,
  type InsertPortfolio,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Portfolio operations
  getUserPortfolios(userId: string): Promise<Portfolio[]>;
  getPortfolio(id: string): Promise<Portfolio | undefined>;
  createPortfolio(userId: string, portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: string, portfolio: Partial<InsertPortfolio>): Promise<Portfolio | undefined>;
  deletePortfolio(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Portfolio operations
  async getUserPortfolios(userId: string): Promise<Portfolio[]> {
    return await db.select().from(portfolios).where(eq(portfolios.userId, userId));
  }

  async getPortfolio(id: string): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.id, id));
    return portfolio;
  }

  async createPortfolio(userId: string, portfolioData: InsertPortfolio): Promise<Portfolio> {
    const [portfolio] = await db
      .insert(portfolios)
      .values({ ...portfolioData, userId })
      .returning();
    return portfolio;
  }

  async updatePortfolio(id: string, portfolioData: Partial<InsertPortfolio>): Promise<Portfolio | undefined> {
    const [portfolio] = await db
      .update(portfolios)
      .set({ ...portfolioData, updatedAt: new Date() })
      .where(eq(portfolios.id, id))
      .returning();
    return portfolio;
  }

  async deletePortfolio(id: string): Promise<boolean> {
    const result = await db.delete(portfolios).where(eq(portfolios.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
