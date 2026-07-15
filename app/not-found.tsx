import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 text-center">
      <div className="mb-4 font-playfair text-[clamp(64px,12vw,140px)] font-medium leading-none text-copper/30">
        404
      </div>
      <h1 className="m-0 font-playfair text-[clamp(24px,3vw,34px)] font-semibold text-brown">
        This page slipped away
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The ritual you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to glowing.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full px-9 py-4 text-[14px] font-semibold text-cream"
        style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
      >
        Back to Home →
      </Link>
    </div>
  );
}
