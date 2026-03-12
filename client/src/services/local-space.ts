import type { User } from "./auth";
import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  exp: number;
  iat: number;
  sub: string;
  email?: string;
};

class LocalSpace {
  /**
   * Gets local storage items
   */

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  getExpiresAt(): number | null {
    const expiresAt = localStorage.getItem("expiresAt");
    const expiresAtNumber = Number(expiresAt);
    return isNaN(expiresAtNumber) || expiresAtNumber === 0
      ? null
      : expiresAtNumber;
  }

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getInviteToken(): string | null {
    return localStorage.getItem("invite-token");
  }

  /**
   * Sets local storage items
   */

  setInviteToken(token: string): void {
    localStorage.setItem("invite-token", token);
  }

  setAccessToken(token: string): void {
    localStorage.setItem("accessToken", token);
    window.dispatchEvent(new Event("auth-change"));
  }

  setExpiresAt(token: string): void {
    const { exp } = jwtDecode<JwtPayload>(token);
    const expiresAt = Number(exp) * 1000;
    localStorage.setItem("expiresAt", String(expiresAt));
    window.dispatchEvent(new Event("auth-change"));
  }

  setUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("auth-change"));
  }

  /**
   * Removes all local storage items
   */

  removeInviteToken(): void {
    localStorage.removeItem("invite-token");
  }

  removeAccessToken(): void {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("auth-change"));
  }

  removeExpiresAt(): void {
    localStorage.removeItem("expiresAt");
    window.dispatchEvent(new Event("auth-change"));
  }

  removeUser(): void {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
  }
}

export default new LocalSpace();
