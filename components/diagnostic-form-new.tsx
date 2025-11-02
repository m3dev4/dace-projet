"use client";

import { useState, useTransition, useRef } from "react";
import { createDiagnostic } from "@/app/actions/diagnostic";

/**
 * Composant formulaire DACE complet
 * Formulaire structuré selon la méthodologie DACE avec champs quantitatifs et qualitatifs
 */
export function DiagnosticFormNew() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createDiagnostic(formData);

      if (result.success) {
        setSuccessMessage("✅ Diagnostic créé avec succès !");
        formRef.current?.reset();
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ _form: [result.error || "Une erreur est survenue"] });
        }
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      {/* Messages de feedback */}
      {successMessage && (
        <div className="rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-950 dark:border-green-800">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            {successMessage}
          </p>
        </div>
      )}

      {errors._form && (
        <div className="rounded-lg bg-red-50 p-4 border border-red-200 dark:bg-red-950 dark:border-red-800">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            {errors._form[0]}
          </p>
        </div>
      )}

      {/* ========== INFORMATIONS GÉNÉRALES ========== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          📋 Informations Générales
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="nomAeroport" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Nom de l'aéroport <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nomAeroport"
              name="nomAeroport"
              required
              className="input-field"
              placeholder="Ex: Aéroport Mohammed V"
            />
            {errors.nomAeroport && <ErrorText>{errors.nomAeroport[0]}</ErrorText>}
          </div>

          <div className="space-y-2">
            <label htmlFor="localisation" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Localisation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="localisation"
              name="localisation"
              required
              className="input-field"
              placeholder="Ex: Casablanca, Maroc"
            />
            {errors.localisation && <ErrorText>{errors.localisation[0]}</ErrorText>}
          </div>

          <div className="space-y-2">
            <label htmlFor="codeIATA" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Code IATA
            </label>
            <input
              type="text"
              id="codeIATA"
              name="codeIATA"
              maxLength={3}
              className="input-field"
              placeholder="Ex: CMN"
              style={{ textTransform: "uppercase" }}
            />
            {errors.codeIATA && <ErrorText>{errors.codeIATA[0]}</ErrorText>}
          </div>

          <div className="space-y-2">
            <label htmlFor="codeICAO" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Code ICAO
            </label>
            <input
              type="text"
              id="codeICAO"
              name="codeICAO"
              maxLength={4}
              className="input-field"
              placeholder="Ex: GMMN"
              style={{ textTransform: "uppercase" }}
            />
            {errors.codeICAO && <ErrorText>{errors.codeICAO[0]}</ErrorText>}
          </div>

          <div className="space-y-2">
            <label htmlFor="dateDiagnostic" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Date du diagnostic <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateDiagnostic"
              name="dateDiagnostic"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="input-field"
            />
            {errors.dateDiagnostic && <ErrorText>{errors.dateDiagnostic[0]}</ErrorText>}
          </div>
        </div>
      </div>

      {/* ========== COMPOSANTES PHYSIQUES (Quantitatives) ========== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          🏗️ Composantes Physiques (Données Quantitatives)
        </h3>

        {/* Pistes */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">✈️ Pistes</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <NumberInput name="nombrePistes" label="Nombre de pistes" placeholder="2" error={errors.nombrePistes} />
            <NumberInput name="capaciteHorairePistes" label="Capacité horaire (mvts/h)" placeholder="60" step="0.1" error={errors.capaciteHorairePistes} />
            <NumberInput name="longueurPistePrincipale" label="Longueur principale (m)" placeholder="3720" error={errors.longueurPistePrincipale} />
          </div>
        </div>

        {/* Terminaux */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">🏢 Terminaux</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <NumberInput name="nombreTerminaux" label="Nombre de terminaux" placeholder="2" error={errors.nombreTerminaux} />
            <NumberInput name="capacitePassagersAn" label="Capacité (M pass./an)" placeholder="14" error={errors.capacitePassagersAn} />
            <NumberInput name="fluxPassagersHeurePte" label="Flux en heure de pointe" placeholder="2500" step="0.1" error={errors.fluxPassagersHeurePte} />
          </div>
        </div>

        {/* Postes aéronefs */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">🛫 Postes Aéronefs</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <NumberInput name="nombrePostesTotal" label="Total postes" placeholder="48" error={errors.nombrePostesTotal} />
            <NumberInput name="nombrePostesContact" label="Postes contact (passerelles)" placeholder="24" error={errors.nombrePostesContact} />
            <NumberInput name="nombrePostesDistants" label="Postes distants" placeholder="24" error={errors.nombrePostesDistants} />
          </div>
        </div>

        {/* Tour de contrôle */}
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">🗼 Tour de Contrôle</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <NumberInput name="hauteurTourControle" label="Hauteur (m)" placeholder="45" error={errors.hauteurTourControle} />
          </div>
        </div>
      </div>

      {/* ========== INDICATEURS DE PERFORMANCE (KPI) ========== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          📊 Indicateurs de Performance (KPI)
        </h3>

        {/* Taux et ratios */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">📈 Taux et Ratios</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <NumberInput name="tauxSaturation" label="Taux de saturation (%)" placeholder="75" step="0.1" error={errors.tauxSaturation} />
            <NumberInput name="tauxOccupation" label="Taux d'occupation (%)" placeholder="85" step="0.1" error={errors.tauxOccupation} />
            <NumberInput name="tempsMoyenTraitement" label="Temps moyen (min)" placeholder="45" step="0.1" error={errors.tempsMoyenTraitement} />
          </div>
        </div>

        {/* Trafic actuel */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">✈️ Trafic Actuel</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <NumberInput name="passagersAnActuel" label="Passagers/an (milliers)" placeholder="10000" error={errors.passagersAnActuel} />
            <NumberInput name="volsReguliers" label="Vols réguliers/jour" placeholder="120" error={errors.volsReguliers} />
          </div>
          <div className="space-y-2">
            <label htmlFor="periodesPointe" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Périodes de pointe
            </label>
            <textarea
              id="periodesPointe"
              name="periodesPointe"
              rows={2}
              className="textarea-field"
              placeholder="Ex: 6h-9h et 18h-21h en semaine..."
            />
            {errors.periodesPointe && <ErrorText>{errors.periodesPointe[0]}</ErrorText>}
          </div>
        </div>
      </div>

      {/* ========== COMPOSANTES FONCTIONNELLES (Qualitatives) ========== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          ⚙️ Composantes Fonctionnelles (Données Qualitatives)
        </h3>

        {/* Flux et cheminements */}
        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">🚶 Flux et Cheminements</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <TextareaField
              name="cheminementPassagers"
              label="Cheminement passagers"
              placeholder="Description du flux passagers (arrivées, départs, correspondances)..."
              error={errors.cheminementPassagers}
            />
            <TextareaField
              name="routageAvions"
              label="Routage avions"
              placeholder="Description du routage des avions sur l'aérodrome..."
              error={errors.routageAvions}
            />
          </div>
        </div>

        {/* Sécurité et normes */}
        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">🛡️ Sécurité et Normes</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <TextareaField
              name="normesOACIIATA"
              label="Normes OACI/IATA"
              placeholder="Intégration et conformité aux normes OACI/IATA..."
              error={errors.normesOACIIATA}
            />
            <TextareaField
              name="niveauxSecurite"
              label="Niveaux de sécurité"
              placeholder="Analyse des niveaux de sécurité appliqués..."
              error={errors.niveauxSecurite}
            />
          </div>
          <TextareaField
            name="exigencesConfort"
            label="Exigences de confort et sécurité"
            placeholder="Intégration des exigences de confort et de sécurité..."
            error={errors.exigencesConfort}
          />
        </div>

        {/* Points de friction et équipements */}
        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">⚠️ Points de Friction et Équipements</h4>
          <TextareaField
            name="pointsFriction"
            label="Points de friction ou saturation"
            placeholder="Identification des points de friction ou de saturation identifiés..."
            error={errors.pointsFriction}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextareaField
              name="equipementsSecurite"
              label="Équipements de sécurité"
              placeholder="Description des équipements de sécurité..."
              error={errors.equipementsSecurite}
            />
            <TextareaField
              name="servicesTechniques"
              label="Services techniques"
              placeholder="Description des services techniques..."
              error={errors.servicesTechniques}
            />
          </div>
        </div>
      </div>

      {/* ========== ÉVALUATION ET OPTIMISATION ========== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          🎯 Évaluation et Scénarios d'Optimisation
        </h3>

        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">📊 Trois Niveaux d'Optimisation</h4>
          
          <TextareaField
            name="optimisationLegere"
            label="1️⃣ Optimisation légère"
            placeholder="Procédures, organisation, signalisation..."
            rows={3}
            error={errors.optimisationLegere}
            hint="Modifications mineures : organisation, signalétique, procédures"
          />

          <TextareaField
            name="optimisationMoyenne"
            label="2️⃣ Optimisation moyenne"
            placeholder="Ajout de modules temporaires ou équipements..."
            rows={3}
            error={errors.optimisationMoyenne}
            hint="Ajout de modules temporaires, équipements complémentaires"
          />

          <TextareaField
            name="optimisationLourde"
            label="3️⃣ Optimisation lourde"
            placeholder="Agrandissement, nouvelle infrastructure..."
            rows={3}
            error={errors.optimisationLourde}
            hint="Agrandissement, construction de nouvelle infrastructure"
          />
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-white">💰 Estimations</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <TextareaField
              name="estimationImpacts"
              label="Estimation des impacts"
              placeholder="Estimation sommaire des impacts et du coût..."
              error={errors.estimationImpacts}
            />
            <div className="space-y-2">
              <label htmlFor="estimationCouts" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Coûts estimés (millions €)
              </label>
              <input
                type="number"
                id="estimationCouts"
                name="estimationCouts"
                step="0.1"
                min="0"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                placeholder="Ex: 25.5"
              />
              {errors.estimationCouts && <ErrorText>{errors.estimationCouts[0]}</ErrorText>}
            </div>
          </div>
        </div>
      </div>

      {/* ========== OBSERVATIONS ET MÉTADONNÉES ========== */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
          📝 Observations et Métadonnées
        </h3>

        <TextareaField
          name="notesObservation"
          label="Notes d'observation"
          placeholder="Notes générales, observations terrain, remarques importantes..."
          rows={5}
          error={errors.notesObservation}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TextareaField
            name="contraintesStructurelles"
            label="Contraintes structurelles"
            placeholder="Contraintes structurelles, environnementales ou réglementaires..."
            error={errors.contraintesStructurelles}
          />
          <TextareaField
            name="donneesLocales"
            label="Données locales"
            placeholder="Collecte de données locales : plans, observations terrain, entretiens..."
            error={errors.donneesLocales}
          />
        </div>
      </div>

      {/* ========== BOUTONS D'ACTION ========== */}
      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          onClick={() => {
            formRef.current?.reset();
            setErrors({});
            setSuccessMessage("");
          }}
          disabled={isPending}
          className="rounded-lg border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
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

// Helper components
function NumberInput({ name, label, placeholder, step = "1", error }: {
  name: string;
  label: string;
  placeholder?: string;
  step?: string;
  error?: string[];
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        step={step}
        min="0"
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
        placeholder={placeholder}
      />
      {error && <ErrorText>{error[0]}</ErrorText>}
    </div>
  );
}

function TextareaField({ name, label, placeholder, rows = 3, error, hint }: {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: string[];
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      {hint && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white resize-none"
        placeholder={placeholder}
      />
      {error && <ErrorText>{error[0]}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-red-600 dark:text-red-400">{children}</p>;
}
