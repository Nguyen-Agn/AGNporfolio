import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  content: Record<string, any>;
  template?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    content: { type: Object, default: {} },
    template: { type: String, default: "default" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
