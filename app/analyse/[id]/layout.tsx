import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

/**
 * Layout pour la page d'analyse DACE
 */
export default function AnalyseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mx-auto max-w-7xl">
          <Link 
            href="/diagnostic"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-6"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux diagnostics
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
