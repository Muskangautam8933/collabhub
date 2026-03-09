import { AuthContext } from "@/middlewares/auth.guard";
import type { LoaderFunction } from "react-router";

export const authLoader: LoaderFunction = async ({ context, request }) => {
  const ctx = context.get(AuthContext);

  const url = new URL(request.url);
  const password = url.searchParams.get("password");
  const email = url.searchParams.get("email");

  if (ctx) return null;
};
