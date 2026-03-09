import myProjectRole from "@/services/get-myProjectRole";
import { redirect, type MiddlewareFunction } from "react-router";
import { AuthContext, type TAuthContext } from "./auth.guard";
import localSpace from "@/services/local-space";
import { ROUTES } from "@/_routes.constants";

export const MemberGuard: MiddlewareFunction = async ({ params, context }) => {
  const projectId = params.projectId;

  const token = localSpace.getAccessToken();

  if (!projectId) return redirect(ROUTES.PRIVATE.PROJECTS.ROOT);

  if (!token) return redirect(ROUTES.PUBLIC.LOGIN);

  const res = await myProjectRole(projectId);

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
    role: res.role,
  };

  context.set(AuthContext, newCtx);
};
