export interface MenuDetail {
    menuId: number;
    menuName: string;
    menuDes: string;
    parentMenuId: number;
    menuOrder: number;
    menuUrl: string;
    role: string | null; // Adjust based on the actual type if needed
    subMenu: string;
    createdBy: string;
    createdDate: string; // Use `Date` if you prefer handling dates as Date objects
    updatedBy: string | null; // Adjust based on the actual type if needed
    updatedDate: string | null; // Use `Date` if you prefer handling dates as Date objects
    isActive: boolean;
    isDeleted: boolean;
  }
  