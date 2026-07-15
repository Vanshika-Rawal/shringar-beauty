"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthField, AuthError } from "@/components/auth/AuthField";
import { FullScreenLoader } from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { authErrorMessage } from "@/lib/utils/authErrors";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/profile";
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push(redirect);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      image="/products/product-106.png"
      title={
        <>
          Your beauty ritual,
          <br />
          continued.
        </>
      }
      subtitle="Sign in to access your saved favourites, orders and members-only offers."
    >
      <div className="mb-8">
        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-copper">
          <span className="h-px w-7 bg-copper/50" /> Welcome back
        </span>
        <h1 className="mt-4 mb-0 font-playfair text-[clamp(30px,3.4vw,38px)] font-semibold leading-[1.1] text-brown">
          Sign in
        </h1>
        <p className="mt-2.5 text-[14px] text-muted">Enter your details to continue.</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <AuthError message={error} />
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          placeholder="you@example.com"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          }
        />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          placeholder="••••••••"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          }
        />
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[12.5px] font-medium text-muted">
            <input type="checkbox" className="h-4 w-4 rounded border-copper/30 accent-copper" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-[12.5px] font-medium text-copper hover:text-copper-dark">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full py-[15px] text-[14px] font-semibold text-cream shadow-[0_18px_38px_-16px_rgba(91,70,56,0.95)] transition-all duration-300 hover:shadow-[0_22px_46px_-16px_rgba(91,70,56,1)] disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
        >
          {loading ? "Signing in…" : (
            <>
              Sign in
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-mid">
        <span className="h-px flex-1 bg-brown/10" />
        New to SHRINGAR
        <span className="h-px flex-1 bg-brown/10" />
      </div>

      <Link
        href="/signup"
        className="flex items-center justify-center rounded-full border border-[#E7DCD0] py-[13px] text-[13.5px] font-semibold text-brown transition-colors hover:border-copper hover:text-copper-dark"
      >
        Create an account
      </Link>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <LoginForm />
    </Suspense>
  );
}
