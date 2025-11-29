export interface Member {
  id: number;
  name: string;
  image: string;
  department: string;
  createdAt: string; // hoặc Date nếu muốn parse
  order: number;
  isActive: boolean;
  showWeb: boolean;
}
