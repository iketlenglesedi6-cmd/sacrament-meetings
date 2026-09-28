'use client';

import { useActionState } from "react";
import { login, type AuthState } from "@/lib/auth-actions";

const initialState: AuthState = { message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="w-full max-w-md rounded border border-[#b7b398] bg-[#f8f5ed] p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#a26945]">Bishopric access</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-[#304a2c]">Sign in</h2>
      </div>

      <div className="space-y-5">
        <label className="block text-sm font-medium text-[#304a2c]">
          Username
          <input
            name="username"
            type="text"
            defaultValue="bishopric"
            className="mt-2 w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-base text-[#304a2c] outline-none ring-0 focus:border-[#304a2c]"
          />
        </label>

        <label className="block text-sm font-medium text-[#304a2c]">
          Password
          <input
            name="password"
            type="password"
            placeholder="Enter the ward password"
            className="mt-2 w-full rounded border border-[#b7b398] bg-white px-3 py-2 text-base text-[#304a2c] outline-none ring-0 focus:border-[#304a2c]"
          />
        </label>
      </div>

      {state?.message ? (
        <p className="mt-5 rounded border border-[#a26945] bg-[#fff6f2] px-3 py-2 text-sm text-[#7a3d26]" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#d7d1bd] pt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#5a6349]">Demo login: bishopric / ward2024</p>
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-[#304a2c] px-5 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-[#23361f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
