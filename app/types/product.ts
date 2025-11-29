export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  salePrice: number;
  url?: string;
  cateId?: number;
  createDate: string; // dùng string hoặc Date
  description: string;
  content: string;
  isActive: boolean;
  categoryProductId: number;
}


