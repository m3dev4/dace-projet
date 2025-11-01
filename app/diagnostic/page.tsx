import { DiagnosticForm } from "@/components/diagnostic-form";
import { getDiagnostics } from "@/app/actions/diagnostic";

/**
 * Page Diagnostic
 * Affiche le formulaire de création de diagnostic et la liste des diagnostics existants
 */
export default async function DiagnosticPage() {
  const result = await getDiagnostics();
  const diagnostics = result.success ? (result.data as any[]) : [];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Diagnostics Aéroportuaires
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Créez et gérez vos diagnostics d'infrastructures aéroportuaires
        </p>
      </div>

      {/* Formulaire de création */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Nouveau diagnostic
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Remplissez le formulaire ci-dessous pour créer un nouveau diagnostic
          </p>
        </div>
        <DiagnosticForm />
      </div>

      {/* Liste des diagnostics */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-zinc-200 p-6 dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Diagnostics existants ({diagnostics.length})
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
                Aucun diagnostic enregistré
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Utilisez le formulaire ci-dessus pour créer votre premier
                diagnostic
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {diagnostics.map((diagnostic) => (
                <div
                  key={diagnostic.id}
                  className="rounded-lg border border-zinc-200 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-700/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
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
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {diagnostic.nomAeroport}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            📍 {diagnostic.localisation}
                          </p>
                        </div>
                      </div>

                      {/* Détails */}
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {diagnostic.pistes && (
                          <div>
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Pistes
                            </p>
                            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                              {diagnostic.pistes}
                            </p>
                          </div>
                        )}
                        {diagnostic.terminaux && (
                          <div>
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Terminaux
                            </p>
                            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                              {diagnostic.terminaux}
                            </p>
                          </div>
                        )}
                        {diagnostic.postesAeronefs && (
                          <div>
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Postes aéronefs
                            </p>
                            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                              {diagnostic.postesAeronefs}
                            </p>
                          </div>
                        )}
                        {diagnostic.tourControle && (
                          <div>
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                              Tour de contrôle
                            </p>
                            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                              {diagnostic.tourControle}
                            </p>
                          </div>
                        )}
                      </div>

                      {diagnostic.notesObservation && (
                        <div className="mt-4">
                          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Notes d'observation
                          </p>
                          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                            {diagnostic.notesObservation}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col items-end gap-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                        Actif
                      </span>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {new Date(diagnostic.dateDiagnostic).toLocaleDateString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        Créé le{" "}
                        {new Date(diagnostic.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
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
