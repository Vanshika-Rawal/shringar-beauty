"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { updateUser } from "@/lib/firebase/users";

export default function SettingsPage() {
  const { firebaseUser, profile, refreshProfile } = useAuth();
  const { notify } = useToast();
  const [name, setName] = useState(profile?.displayName ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [saving, setSaving] = useState(false);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!firebaseUser) return;
    setSaving(true);
    try {
      await updateUser(firebaseUser.uid, { displayName: name, phone });
      await refreshProfile();
      notify("Profile updated");
    } catch {
      notify("Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  const field = "w-full rounded-xl border border-copper/20 px-4 py-3 text-[14px] outline-none focus:border-copper disabled:bg-cream/60 disabled:text-muted";

  return (
    <div>
      <h1 className="mb-8 font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">
        Account Settings
      </h1>

      <form onSubmit={onSave} className="max-w-[520px] rounded-3xl border border-copper/15 bg-white p-6">
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Full name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Email</span>
            <input value={profile?.email ?? ""} disabled className={field} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">Phone</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91" className={field} />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="mt-1 self-start rounded-full px-8 py-3 text-[14px] font-semibold text-cream transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
