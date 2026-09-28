'use server';

import { redirect } from "next/navigation";
import { clearSession, setSession } from "@/lib/auth";

export type AuthState = {
  message?: string;
};

export async function login(_prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username !== "bishopric" || password !== "ward2024") {
    return { message: "Incorrect username or password. Please try again." };
  }

  await setSession();
  redirect("/meetings/new");
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/");
}
