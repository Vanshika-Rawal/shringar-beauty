"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextValue {
  notify: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-[84px] z-[200] flex flex-col gap-3 md:right-7 md:top-24">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="anim-toastIn pointer-events-auto relative flex items-center gap-3 overflow-hidden rounded-2xl border border-copper/25 bg-white/90 py-3.5 pl-4 pr-6 text-[13.5px] font-semibold text-brown shadow-[0_28px_60px_-22px_rgba(201,143,115,0.75)] backdrop-blur-xl"
            style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.96),rgba(250,247,242,0.94))" }}
          >
            {/* gold accent bar */}
            <span
              className="absolute inset-y-0 left-0 w-[3px]"
              style={{ background: "linear-gradient(180deg,#E8CBA0,#C98F73)" }}
            />
            {/* soft sheen sweep */}
            <span
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(70% 80% at 12% 30%,rgba(232,203,160,0.22),transparent 60%)" }}
            />
            <span
              className="relative flex h-7 w-7 flex-none items-center justify-center rounded-full text-[13px] text-cream shadow-[0_6px_14px_-6px_rgba(91,70,56,0.6)]"
              style={{ background: "linear-gradient(135deg,#5B4638,#C98F73)" }}
            >
              ✦
            </span>
            <span className="relative whitespace-nowrap">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
