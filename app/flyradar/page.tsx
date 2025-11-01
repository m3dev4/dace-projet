/**
 * Page FlyRadar
 * Affiche un placeholder pour le suivi des vols en temps réel
 * Fonctionnalité à implémenter ultérieurement
 */
export default function FlyRadarPage() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          FlyRadar
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Suivi des vols en temps réel et analyse du trafic aérien
        </p>
      </div>

      {/* Carte placeholder */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden">
        <div className="border-b border-zinc-200 p-6 dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Carte de suivi des vols
          </h2>
        </div>
        <div className="relative h-[600px] bg-linear-to-br from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900">
          {/* Placeholder pour la carte */}
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
                <svg
                  className="h-12 w-12 text-blue-600 dark:text-blue-400"
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
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Fonctionnalité en développement
              </h3>
              <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                L'interface de suivi des vols en temps réel sera bientôt
                disponible. Elle permettra de visualiser les trajectoires, les
                informations de vol et l'analyse du trafic aérien.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    0
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Vols actifs
                  </div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    0
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Arrivées
                  </div>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    0
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Départs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fonctionnalités prévues */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
            Carte interactive
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Visualisation en temps réel des vols sur une carte interactive avec
            zoom et filtres
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
            Informations détaillées
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Accès aux détails complets de chaque vol : origine, destination,
            altitude, vitesse
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
            Analyse du trafic
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Statistiques et analyses du trafic aérien avec graphiques et
            tendances
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950">
            <svg
              className="h-6 w-6 text-orange-600 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
            Alertes personnalisées
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Notifications pour les vols spécifiques ou événements importants
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
            Historique des vols
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Consultation de l'historique et replay des trajectoires passées
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950">
            <svg
              className="h-6 w-6 text-cyan-600 dark:text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
            Filtres avancés
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Filtrage par compagnie, type d'appareil, altitude, et plus encore
          </p>
        </div>
      </div>
    </div>
  );
}
