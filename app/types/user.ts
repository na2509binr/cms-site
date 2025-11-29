export enum UserRole {
  Dev = "Dev",
  Admin = "Admin",
  User = "User",
}

export interface User {
  id: string; // UUID
  email: string;
  passwordHash: string; // hashed password
  displayName?: string;
  createdAt: Date;
  isLocked: boolean;
  role: UserRole;
}

// Type for creating a new user (without id and createdAt)
export type CreateUserInput = Omit<User, "id" | "createdAt">;

// Type for user response (exclude passwordHash from API responses)
export type UserResponse = Omit<User, "passwordHash">;