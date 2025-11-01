import { getDiagnostics } from "@/app/actions/diagnostic";
import Link from "next/link";

/**
 * Page Dashboard
 * Affiche un aperçu général avec les statistiques et les derniers diagnostics
 */
export default async function DashboardPage() {
  const result = await getDiagnostics();
  const diagnostics = result.success ? (result.data as any[]) : [];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Vue d'ensemble de vos diagnostics aéroportuaires
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total diagnostics */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Total Diagnostics
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                {diagnostics.length}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cette semaine */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Cette semaine
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                {
                  diagnostics.filter((d) => {
                    const createdAt = new Date(d.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return createdAt >= weekAgo;
                  }).length
                }
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Ce mois */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Ce mois
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                {
                  diagnostics.filter((d) => {
                    const createdAt = new Date(d.createdAt);
                    const monthAgo = new Date();
                    monthAgo.setMonth(monthAgo.getMonth() - 1);
                    return createdAt >= monthAgo;
                  }).length
                }
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950">
              <svg
                className="h-6 w-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Actions rapides
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link
            href="/diagnostic"
            className="flex items-center gap-3 rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
              <svg
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Nouveau diagnostic
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Créer un diagnostic aéroportuaire
              </p>
            </div>
          </Link>

          <Link
            href="/flyradar"
            className="flex items-center gap-3 rounded-lg border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
              <svg
                className="h-5 w-5 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                FlyRadar
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Suivi des vols en temps réel
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Derniers diagnostics */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-zinc-200 p-6 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Derniers diagnostics
          </h2>
        </div>
        <div className="p-6">
          {diagnostics.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-sm font-medium text-zinc-900 dark:text-white">
                Aucun diagnostic
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Commencez par créer votre premier diagnostic
              </p>
              <div className="mt-6">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Créer un diagnostic
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {diagnostics.slice(0, 5).map((diagnostic) => (
                <div
                  key={diagnostic.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                      <svg
                        className="h-5 w-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-white">
                        {diagnostic.nomAeroport}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {diagnostic.localisation}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {new Date(diagnostic.dateDiagnostic).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
