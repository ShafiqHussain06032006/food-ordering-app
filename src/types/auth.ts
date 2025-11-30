export type UserRole = "customer" | "vendor" | "admin";

export interface UserSession {
  name: string;
  role: UserRole;
}
