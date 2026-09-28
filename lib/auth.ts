import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_COOKIE = "warden_session";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(AUTH_COOKIE)?.value;

  if (sessionValue === "true") {
    return { user: "bishopric" };
  }

  return null;
}

export async function isAuthenticated() {
  return Boolean(await getSession());
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function setSession() {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE, "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
