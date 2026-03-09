import { ROUTES } from "@/_routes.constants";
import me, { type User } from "@/services/get-me";
import localSpace from "@/services/local-space";
import { redirect, createContext, type MiddlewareFunction } from "react-router";

export type TAuthContext = {
  isAuth: boolean;
  token: string;
  expiresAt: number;
  user: User;
  role?: string;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export const AdminGuard: MiddlewareFunction = async ({ context }) => {
  const role = "owner";

  if (role !== "owner" && role !== "admin") throw new Error("Unauthorized");
};
