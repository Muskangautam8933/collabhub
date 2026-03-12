import type { LoaderFunction } from "react-router";
import { userContext } from "./root.loader";

export const authLoader: LoaderFunction = async ({ context, request }) => {
  const ctx = context.get(userContext);

  const url = new URL(request.url);
  const password = url.searchParams.get("password");
  const email = url.searchParams.get("email");

  console.log(password, email);

  if (ctx) return null;
};
