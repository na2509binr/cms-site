// models/news-section.ts

export interface NewsSection {
  id: number;
  newsId: number;
  title: string;
  content: string;
  order: number;
}
