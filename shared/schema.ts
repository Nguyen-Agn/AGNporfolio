export type Portfolio = {
  _id: string;   // giữ nguyên
  userId: string;
  title: string;
  description?: string;
  content: Record<string, any>;
  template: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;   // giữ nguyên
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type InsertPortfolio = {
  userId: string;
  title: string;
  description?: string;
  content?: Record<string, any>;
  template?: string;
  isPublished?: boolean;
};

export type UserMin = { id: string; email: string }