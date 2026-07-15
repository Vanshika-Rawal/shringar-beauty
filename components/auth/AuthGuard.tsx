"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  /** Require an admin role in addition to being signed in. */
  requireAdmin?: boolean;
  redirectTo?: string;
}

/** Client-side gate for protected pages. Pairs with middleware.ts. */
export function AuthGuard({
  children,
  requireAdmin = false,
  redirectTo = "/login",
}: AuthGuardProps) {
  const {
    firebaseUser,
    profile,
    loading,
    profileLoading,
    profileError,
    isAdmin,
    refreshProfile,
  } = useAuth();
  const router = useRouter();

  // Pull the freshest role when entering an admin page, so a role just changed
  // in the Firestore console takes effect without a full sign-out/in.
  useEffect(() => {
    if (requireAdmin && firebaseUser) void refreshProfile();
  }, [requireAdmin, firebaseUser, refreshProfile]);

  // Wait until auth AND the profile/role have fully resolved before deciding.
  const resolving = loading || (!!firebaseUser && profileLoading);

  useEffect(() => {
    if (resolving) return;
    if (!firebaseUser) {
      router.replace(redirectTo);
      return;
    }
    // Only treat as "not admin" once the profile actually loaded. A null profile
    // from a read error is handled separately (don't bounce — show the reason).
    if (requireAdmin && profile && !isAdmin) {
      router.replace("/");
    }
  }, [resolving, firebaseUser, profile, isAdmin, requireAdmin, redirectTo, router]);

  if (resolving) return <FullScreenLoader />;

  if (!firebaseUser) return <FullScreenLoader />;

  // Authenticated, admin required, but the profile couldn't be read at all.
  // This is almost always undeployed Firestore rules — say so instead of a
  // silent redirect that looks like "role not working".
  if (requireAdmin && !profile) {
    return <ProfileErrorScreen error={profileError} onRetry={refreshProfile} />;
  }

  if (requireAdmin && !isAdmin) return <FullScreenLoader />;

  return <>{children}</>;
}

export function FullScreenLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-copper/25 border-t-copper" />
        <span className="font-playfair text-lg text-brown">SHRINGAR</span>
      </div>
    </div>
  );
}

function ProfileErrorScreen({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) {
  const isPermission = (error ?? "").toLowerCase().includes("permission");
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream px-6">
      <div className="max-w-md rounded-3xl border border-copper/20 bg-white p-8 text-center">
        <h1 className="mb-2 font-playfair text-2xl font-bold text-brown">
          Couldn&apos;t verify your access
        </h1>
        <p className="mb-4 text-sm text-muted">
          {isPermission
            ? "Your account is signed in, but the app can't read your profile from Firestore. This means the Firestore security rules haven't been deployed yet."
            : "We couldn't load your account profile."}
        </p>
        {isPermission && (
          <pre className="mb-4 overflow-x-auto rounded-xl bg-cream px-4 py-3 text-left text-[11.5px] text-brown">
            firebase deploy --only firestore:rules
          </pre>
        )}
        {error && (
          <p className="mb-4 break-words text-[11px] text-muted/70">{error}</p>
        )}
        <button
          onClick={onRetry}
          className="rounded-full bg-brown px-6 py-2.5 text-[13px] font-semibold text-cream"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
