export type VibeType = "positive" | "negative" | "neutral";

export type UserType =
  | "individualcustomer"
  | "businesscustomer"
  | "bankemployee"
  | "formeremployee"
  | "investor"
  | "other";
export interface Review {
  _id: string;
  vibe: VibeType;
  companyName: string;
  isAnonymous: boolean;
  name?: string;
  userType: UserType;
  title: string;
  story: string;
  created_at: string;
  updated_at: string;
}
export type CompanyType={
    _id:string; 
    name:string;
    positiveCount:number;
    negativeCount:number;
    totalReviews:number;
    neutralCount:number;
    reviews:Review[];
    complaintRate:number;
}