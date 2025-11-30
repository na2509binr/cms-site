export interface CategoryProduct {
  id: number;
  title: string;
  desciption: string;
  image: string;
  slug: string;
  parentId?: number | null;
  isActive: boolean;
  showMenu: boolean;

}
