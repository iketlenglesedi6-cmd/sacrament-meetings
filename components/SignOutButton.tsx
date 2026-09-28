import { logout } from "@/lib/auth-actions";

export function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-[11px] font-black uppercase tracking-[0.24em] text-[#5a6349] transition hover:text-[#a26945]"
      >
        Sign out
      </button>
    </form>
  );
}
