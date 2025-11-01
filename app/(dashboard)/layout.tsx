import { Sidebar } from "@/components/sidebar";

/**
 * Layout pour les pages avec sidebar
 * Applique une structure avec navigation latérale pour dashboard, diagnostic et flyradar
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <main className="flex-1 ml-64 p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
