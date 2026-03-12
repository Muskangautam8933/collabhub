import me, { type User } from "@/services/get-me";
import localSpace from "@/services/local-space";
import { createContext, redirect, type LoaderFunction } from "react-router";

export const userContext = createContext<User | null>(null);

export const rootLoader: LoaderFunction = async ({ context, request }) => {
  try {
    const user = await me();
    context.set(userContext, user);

    console.log("ROOT LOADER");

    const inviteToken = localSpace.getInviteToken();

    console.log("invite code  ", inviteToken);

    const url = new URL(request.url);
    const pathname = url.pathname;

    if (inviteToken && !pathname.includes("invites")) {
      console.log("REDIRECTING...");
      return redirect(`/invites?code=${inviteToken}`);
    }

    return { user };
  } catch (error) {
    console.log(error);
    context.set(userContext, null);
    return { user: null };
  }
};

export type LoaderData = {
  user: Promise<User | null>;
};
