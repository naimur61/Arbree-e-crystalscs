export type UserRole = "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";

export interface ProfileUser {
  name: string;
  initials: string;
  isActiveNow: boolean;
  role: UserRole;
  jobTitle: string;
  email: string;
  company: string;
}

export type SecurityCardTone = "good" | "warning" | "neutral" | "success";

export interface SecurityCardData {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: SecurityCardTone;
  borderColor?: string;
}

export interface QuickAction {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  locked?: boolean;
  onClick?: () => void;
}
