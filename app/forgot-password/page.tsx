"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthField, AuthError } from "@/components/auth/AuthField";
import { useAuth } from "@/context/AuthContext";
import { authErrorMessage } from "@/lib/utils/authErrors";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="mb-7">
        <h1 className="m-0 font-playfair text-[clamp(26px,3vw,34px)] font-semibold text-brown">
          Reset your password
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          We&apos;ll email you a secure link to set a new password.
        </p>
      </div>

      {sent ? (
        <div className="rounded-2xl border border-copper/20 bg-copper/[0.06] p-6 text-center">
          <div className="mb-2 text-[28px]">✉️</div>
          <p className="text-[14px] text-brown-soft">
            If an account exists for <b className="text-brown">{email}</b>, a reset
            link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <AuthError message={error} />
          <AuthField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="you@example.com" />
          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-full py-3.5 text-[14px] font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
          >
            {loading ? "Sending…" : "Send Reset Link →"}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-[13.5px] text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-copper hover:text-copper-dark">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
