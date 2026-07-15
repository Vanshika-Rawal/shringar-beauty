"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "@/context/ToastContext";
import { FloralBg } from "@/components/ui/TextureBg";

export function Newsletter() {
  const { notify } = useToast();
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    notify("Welcome to the ritual ✦ Check your inbox");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(40px,5vw,72px)]">
      <div
        className="relative overflow-hidden rounded-[28px] px-6 py-[clamp(40px,6vw,72px)] text-center"
        style={{ background: "linear-gradient(135deg,#5B4638,#7A5A48 60%,#C98F73)" }}
      >
        <FloralBg />
        <div className="pointer-events-none absolute right-[6%] top-[-60px] h-[260px] w-[260px] rounded-full anim-blob" style={{ background: "radial-gradient(circle,rgba(232,203,160,.35),transparent 70%)" }} />
        <div className="relative mx-auto max-w-[560px]">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-gold">
            The SHRINGAR Circle
          </div>
          <h2 className="m-0 font-playfair text-[clamp(28px,4vw,46px)] font-semibold leading-[1.1] text-white">
            Unlock 10% off your first ritual
          </h2>
          <p className="mx-auto mb-7 mt-3.5 max-w-[420px] text-[14.5px] leading-[1.7] text-white/70">
            Join for early access to launches, beauty edits & members-only offers.
          </p>
          <form onSubmit={onSubmit} className="mx-auto flex max-w-[440px] flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-cream px-7 py-3.5 text-[13.5px] font-semibold text-brown transition-transform duration-300 hover:scale-[1.03]"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
