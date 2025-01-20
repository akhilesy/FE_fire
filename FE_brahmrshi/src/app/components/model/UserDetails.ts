import { MenuDetail } from "./MenuDetail";

export interface UserDetails {
    userId:string;
    firstName: string;
    lastName: string;
    emailId: string;
    mobile: string;
    country: string;
    role: string;
    menudetails: MenuDetail[];
  }
  