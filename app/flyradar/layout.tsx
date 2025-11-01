import { Sidebar } from "@/components/sidebar";

/**
 * Layout pour la page FlyRadar avec sidebar
 */
export default function FlyRadarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
