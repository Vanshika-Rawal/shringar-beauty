import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard redirectTo="/login?redirect=/profile">
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <DashboardNav />
          <div>{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
