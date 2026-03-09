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

export const AuthGuard: MiddlewareFunction = async ({ context }) => {
  const token = localSpace.getAccessToken();

  if (!token) return redirect(ROUTES.PUBLIC.LOGIN);

  const res = await me();

  const newCtx: TAuthContext = {
    user: {
      accountId: res.accountId,
      email: res.email,
      name: res.name,
      trialEndAt: res.trialEndAt,
      userId: res.userId,
    },
    isAuth: true,
    token,
    expiresAt: localSpace.getExpiresAt()!,
    role: undefined,
  };

  context.set(AuthContext, newCtx);
};
