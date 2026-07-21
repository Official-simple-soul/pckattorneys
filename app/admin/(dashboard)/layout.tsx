import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();

  return <AdminShell firmName={settings.firmName}>{children}</AdminShell>;
}
