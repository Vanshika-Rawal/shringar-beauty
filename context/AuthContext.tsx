"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User as FirebaseUser } from "firebase/auth";
import {
  ensureUserDocument,
  fetchUserProfile,
  resetPassword as fbReset,
  signInWithEmail,
  signOut as fbSignOut,
  signUpWithEmail,
  subscribeToAuth,
} from "@/lib/firebase/auth";
import type { AppUser } from "@/types";

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  profile: AppUser | null;
  loading: boolean;
  /** True while the Firestore profile (and therefore role) is still resolving. */
  profileLoading: boolean;
  /** Set when the profile read failed (e.g. Firestore rules / network). */
  profileError: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const loadProfile = useCallback(async (user: FirebaseUser) => {
    setProfileLoading(true);
    try {
      let p = await fetchUserProfile(user.uid);
      // Recovery: auth user exists but the Firestore doc is missing
      // (e.g. a previous signup failed mid-way) — create it now.
      if (!p) {
        p = await ensureUserDocument(
          user.uid,
          user.email ?? "",
          user.displayName ?? ""
        );
      }
      setProfile(p);
      setProfileError(null);
    } catch (err) {
      // Surface instead of silently nulling — a null profile here is almost
      // always undeployed Firestore rules, not a missing admin role.
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Auth] Failed to read user profile:", msg);
      setProfile(null);
      setProfileError(msg);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsub = subscribeToAuth(async (user) => {
      // Re-enter the loading state on EVERY auth change so guards wait for the
      // role to resolve instead of redirecting on a momentarily-null profile.
      setLoading(true);
      setFirebaseUser(user);
      if (user) {
        // Lightweight signal for middleware-based route protection.
        document.cookie = `shringar_auth=1; path=/; max-age=2592000; SameSite=Lax`;
        await loadProfile(user);
      } else {
        document.cookie = `shringar_auth=; path=/; max-age=0; SameSite=Lax`;
        setProfile(null);
        setProfileError(null);
        setProfileLoading(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [loadProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmail(email, password);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const p = await signUpWithEmail(email, password, name);
      setProfile(p);
    },
    []
  );

  const signOut = useCallback(async () => {
    await fbSignOut();
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await fbReset(email);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (firebaseUser) await loadProfile(firebaseUser);
  }, [firebaseUser, loadProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      firebaseUser,
      profile,
      loading,
      profileLoading,
      profileError,
      isAdmin: profile?.role === "admin",
      signIn,
      signUp,
      signOut,
      resetPassword,
      refreshProfile,
    }),
    [
      firebaseUser,
      profile,
      loading,
      profileLoading,
      profileError,
      signIn,
      signUp,
      signOut,
      resetPassword,
      refreshProfile,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
