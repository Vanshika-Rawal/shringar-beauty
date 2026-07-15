import { AuthGuard } from "@/components/auth/AuthGuard";
import { AdminNav } from "@/components/dashboard/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAdmin redirectTo="/login?redirect=/admin">
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <AdminNav />
          <div>{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
