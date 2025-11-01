"use client";

import { useState, useTransition } from "react";
import { createDiagnostic } from "@/app/actions/diagnostic";
import type { DiagnosticInput } from "@/lib/validations/diagnostic";

/**
 * Composant formulaire pour créer un nouveau diagnostic
 * Utilise les Server Actions de Next.js pour la soumission
 * Validation côté client et serveur avec Zod
 */
export function DiagnosticForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  /**
   * Gestion de la soumission du formulaire
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);

    // Conversion FormData en objet typé
    const data: DiagnosticInput = {
      nomAeroport: formData.get("nomAeroport") as string,
      localisation: formData.get("localisation") as string,
      pistes: formData.get("pistes") as string || "",
      terminaux: formData.get("terminaux") as string || "",
      postesAeronefs: formData.get("postesAeronefs") as string || "",
      tourControle: formData.get("tourControle") as string || "",
      fluxPassagers: formData.get("fluxPassagers") as string || "",
      equipementsSecurite: formData.get("equipementsSecurite") as string || "",
      servicesTechniques: formData.get("servicesTechniques") as string || "",
      notesObservation: formData.get("notesObservation") as string || "",
      dateDiagnostic: new Date(formData.get("dateDiagnostic") as string),
    };

    startTransition(async () => {
      const result = await createDiagnostic(data);

      if (result.success) {
        setSuccessMessage("✅ Diagnostic créé avec succès !");
        // Réinitialiser le formulaire
        event.currentTarget.reset();
        // Effacer le message après 5 secondes
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({
            _form: [result.error || "Une erreur est survenue"],
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Message de succès */}
      {successMessage && (
        <div className="rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-950 dark:border-green-800">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            {successMessage}
          </p>
        </div>
      )}

      {/* Erreur générale */}
      {errors._form && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200 dark:bg-red-950 dark:border-red-800">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            {errors._form[0]}
          </p>
        </div>
      )}

      {/* Section: Informations générales */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          📋 Informations générales
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Nom de l'aéroport */}
          <div className="space-y-2">
            <label
              htmlFor="nomAeroport"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Nom de l'aéroport <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nomAeroport"
              name="nomAeroport"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              placeholder="Ex: Aéroport Mohammed V"
            />
            {errors.nomAeroport && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.nomAeroport[0]}
              </p>
            )}
          </div>

          {/* Localisation */}
          <div className="space-y-2">
            <label
              htmlFor="localisation"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Localisation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              placeholder="Ex: Casablanca, Maroc"
            />
            {errors.localisation && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.localisation[0]}
              </p>
            )}
          </div>

          {/* Date du diagnostic */}
          <div className="space-y-2">
            <label
              htmlFor="dateDiagnostic"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Date du diagnostic <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateDiagnostic"
              name="dateDiagnostic"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
            {errors.dateDiagnostic && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.dateDiagnostic[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section: Composantes physiques */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          🏗️ Composantes physiques
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Pistes */}
          <div className="space-y-2">
            <label
              htmlFor="pistes"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Pistes
            </label>
            <textarea
              id="pistes"
              name="pistes"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description des pistes..."
            />
            {errors.pistes && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.pistes[0]}
              </p>
            )}
          </div>

          {/* Terminaux */}
          <div className="space-y-2">
            <label
              htmlFor="terminaux"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Terminaux
            </label>
            <textarea
              id="terminaux"
              name="terminaux"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description des terminaux..."
            />
            {errors.terminaux && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.terminaux[0]}
              </p>
            )}
          </div>

          {/* Postes aéronefs */}
          <div className="space-y-2">
            <label
              htmlFor="postesAeronefs"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Postes aéronefs
            </label>
            <textarea
              id="postesAeronefs"
              name="postesAeronefs"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description des postes aéronefs..."
            />
            {errors.postesAeronefs && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.postesAeronefs[0]}
              </p>
            )}
          </div>

          {/* Tour de contrôle */}
          <div className="space-y-2">
            <label
              htmlFor="tourControle"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Tour de contrôle
            </label>
            <textarea
              id="tourControle"
              name="tourControle"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description de la tour de contrôle..."
            />
            {errors.tourControle && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.tourControle[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section: Composantes fonctionnelles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          ⚙️ Composantes fonctionnelles
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Flux passagers */}
          <div className="space-y-2">
            <label
              htmlFor="fluxPassagers"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Flux passagers
            </label>
            <textarea
              id="fluxPassagers"
              name="fluxPassagers"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description des flux passagers..."
            />
            {errors.fluxPassagers && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.fluxPassagers[0]}
              </p>
            )}
          </div>

          {/* Équipements de sécurité */}
          <div className="space-y-2">
            <label
              htmlFor="equipementsSecurite"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Équipements de sécurité
            </label>
            <textarea
              id="equipementsSecurite"
              name="equipementsSecurite"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description des équipements de sécurité..."
            />
            {errors.equipementsSecurite && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.equipementsSecurite[0]}
              </p>
            )}
          </div>

          {/* Services techniques */}
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="servicesTechniques"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Services techniques
            </label>
            <textarea
              id="servicesTechniques"
              name="servicesTechniques"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Description des services techniques..."
            />
            {errors.servicesTechniques && (
              <p className="text-xs text-red-600 dark:text-red-400">
                {errors.servicesTechniques[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section: Observations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          📝 Observations
        </h3>

        <div className="space-y-2">
          <label
            htmlFor="notesObservation"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Notes d'observation
          </label>
          <textarea
            id="notesObservation"
            name="notesObservation"
            rows={5}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
            placeholder="Notes, observations et remarques supplémentaires..."
          />
          {errors.notesObservation && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errors.notesObservation[0]}
            </p>
          )}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          onClick={(e) => {
            const form = e.currentTarget.closest("form");
            if (form) form.reset();
            setErrors({});
            setSuccessMessage("");
          }}
          className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Réinitialiser
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Enregistrement...</span>
            </>
          ) : (
            "Créer le diagnostic"
          )}
        </button>
      </div>
    </form>
  );
}
