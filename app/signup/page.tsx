"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthField, AuthError } from "@/components/auth/AuthField";
import { useAuth } from "@/context/AuthContext";
import { authErrorMessage } from "@/lib/utils/authErrors";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, name);
      router.push("/profile");
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
          Begin your
          <br />
          beauty journey.
        </>
      }
      subtitle="Create your free SHRINGAR account and enjoy 10% off your first ritual, saved favourites and members-only offers."
    >
      <div className="mb-8">
        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-copper">
          <span className="h-px w-7 bg-copper/50" /> Join SHRINGAR
        </span>
        <h1 className="mt-4 mb-0 font-playfair text-[clamp(30px,3.4vw,38px)] font-semibold leading-[1.1] text-brown">
          Create account
        </h1>
        <p className="mt-2.5 text-[14px] text-muted">Get 10% off your first order — it takes a minute.</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <AuthError message={error} />
        <AuthField
          label="Full name"
          value={name}
          onChange={setName}
          autoComplete="name"
          placeholder="Ananya Rao"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />
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
          autoComplete="new-password"
          placeholder="At least 6 characters"
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          }
        />
        <button
          type="submit"
          disabled={loading}
          className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full py-[15px] text-[14px] font-semibold text-cream shadow-[0_18px_38px_-16px_rgba(91,70,56,0.95)] transition-all duration-300 hover:shadow-[0_22px_46px_-16px_rgba(91,70,56,1)] disabled:opacity-60"
          style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
        >
          {loading ? "Creating account…" : (
            <>
              Create account
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-[13.5px] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-copper hover:text-copper-dark">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
