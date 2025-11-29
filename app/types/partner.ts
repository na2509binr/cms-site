export interface Partner {
  id: number;
  name: string;
  image: string;
  url: string;
  createdAt: string; // hoặc Date nếu muốn parse
  order: number;
  isActive: boolean;
  showWeb: boolean;
}
