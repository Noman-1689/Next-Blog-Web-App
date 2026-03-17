// types/index.ts
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "Tech" | "Design" | "Lifestyle";
  readTime: string;
  image?: string;
}
