import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./config";
import type { AppUser } from "@/types";

/** Create an auth user + matching Firestore `users/{uid}` document. */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AppUser> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  return ensureUserDocument(cred.user.uid, email, displayName);
}

/**
 * Guarantee a `users/{uid}` doc exists for a signed-in user. Creates it with
 * the default role on first sign-in / signup, and is safe to call repeatedly
 * (recovers if a previous signup created the auth user but not the doc).
 * `role: "user"` is required by the create rule — never write 'admin' here;
 * promote via the Firestore console / an admin instead.
 */
export async function ensureUserDocument(
  uid: string,
  email: string,
  displayName: string
): Promise<AppUser> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data() as AppUser;
  }

  const profile: AppUser = {
    uid,
    email,
    displayName,
    role: "user",
    addresses: [],
  };

  await setDoc(ref, { ...profile, createdAt: serverTimestamp() });
  return profile;
}

export async function signInWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signOut() {
  await fbSignOut(auth);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

/** Fetch the Firestore profile (role, addresses…) for a signed-in user. */
export async function fetchUserProfile(uid: string): Promise<AppUser | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as AppUser;
}

export function subscribeToAuth(cb: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, cb);
}
