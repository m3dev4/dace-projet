// Section 4 : ANALYSE - Points de Friction
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            4️⃣ Analyse - Points de Friction
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Identification des points de friction ou de saturation
          </p>
        </div>
        <div className="p-6">
          {diagnostic.pointsFriction ? (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950/30">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-300">
                ⚠️ Points Identifiés
              </p>
              <p className="mt-2 text-sm text-orange-800 dark:text-orange-200 whitespace-pre-line">
                {diagnostic.pointsFriction}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Aucun point de friction identifié
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 5 : CALCUL - Capacité et KPI */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-zinc-200 bg-blue-50 px-6 py-4 dark:border-zinc-700 dark:bg-blue-950/30">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            5️⃣ Calcul - Capacité et KPI Essentiels
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Formules simplifiées selon FAA et méthodologie DACE
          </p>
        </div>
        <div className="p-6 space-y-6">
          {/* Capacité pistes */}
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <h3 className="font-medium text-zinc-900 dark:text-white">✈️ Capacité Horaire Pistes (FAA)</h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {capacitePistes.capaciteHoraire || "N/A"}
              </span>
              {capacitePistes.capaciteHoraire && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  mouvements/heure
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Source : {capacitePistes.source}
            </p>
          </div>

          {/* KPI : Taux de saturation */}
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <h3 className="font-medium text-zinc-900 dark:text-white">📊 Taux de Saturation</h3>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${
                  tauxSaturation.couleur === "green" ? "text-green-600 dark:text-green-400" :
                  tauxSaturation.couleur === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                  tauxSaturation.couleur === "orange" ? "text-orange-600 dark:text-orange-400" :
                  "text-red-600 dark:text-red-400"
                }`}>
                  {tauxSaturation.taux !== null ? `${tauxSaturation.taux}%` : "N/A"}
                </span>
              </div>
              {tauxSaturation.niveau && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tauxSaturation.niveau === "faible" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" :
                  tauxSaturation.niveau === "modéré" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" :
                  tauxSaturation.niveau === "élevé" ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400" :
                  "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                }`}>
                  {tauxSaturation.niveau}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Formule : (Trafic actuel / Capacité totale) × 100
            </p>
          </div>

          {/* KPI : Taux d'occupation */}
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <h3 className="font-medium text-zinc-900 dark:text-white">🎯 Taux d'Occupation</h3>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${
                  tauxOccupation.couleur === "green" ? "text-green-600 dark:text-green-400" :
                  tauxOccupation.couleur === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                  tauxOccupation.couleur === "orange" ? "text-orange-600 dark:text-orange-400" :
                  "text-red-600 dark:text-red-400"
                }`}>
                  {tauxOccupation.taux !== null ? `${tauxOccupation.taux}%` : "N/A"}
                </span>
              </div>
              {tauxOccupation.niveau && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tauxOccupation.niveau === "faible" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" :
                  tauxOccupation.niveau === "modéré" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" :
                  tauxOccupation.niveau === "élevé" ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400" :
                  "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                }`}>
                  {tauxOccupation.niveau}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Temps moyen de traitement : {diagnostic.tempsMoyenTraitement ? `${diagnostic.tempsMoyenTraitement} min` : "Non renseigné"}
            </p>
          </div>

          {/* Capacité résiduelle */}
          {capaciteResiduelle.residuelle !== null && (
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <h3 className="font-medium text-zinc-900 dark:text-white">📈 Capacité Résiduelle</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {capaciteResiduelle.residuelle.toLocaleString()}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {capaciteResiduelle.unite}
                </span>
                <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">
                  ({capaciteResiduelle.pourcentage}% restant)
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Formule : Capacité totale - Trafic actuel
              </p>
            </div>
          )}

          {/* Ratio postes/terminal */}
          {ratioPostes.ratio !== null && (
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <h3 className="font-medium text-zinc-900 dark:text-white">🛫 Ratio Postes/Terminal</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {ratioPostes.ratio}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  postes par terminal
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {ratioPostes.interpretation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 6 : ÉVALUATION - Goulots d'Étranglement */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-zinc-200 bg-red-50 px-6 py-4 dark:border-zinc-700 dark:bg-red-950/30">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            6️⃣ Évaluation - Goulots d'Étranglement
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Identification automatique basée sur les KPI
          </p>
        </div>
        <div className="p-6">
          {goulots.length > 0 ? (
            <div className="space-y-3">
              {goulots.map((goulot, index) => (
                <div key={index} className={`rounded-lg border p-4 ${
                  goulot.severite === "critique" ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30" :
                  goulot.severite === "élevée" ? "border-orange-300 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30" :
                  goulot.severite === "modérée" ? "border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30" :
                  "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        goulot.severite === "critique" ? "text-red-900 dark:text-red-300" :
                        goulot.severite === "élevée" ? "text-orange-900 dark:text-orange-300" :
                        goulot.severite === "modérée" ? "text-yellow-900 dark:text-yellow-300" :
                        "text-blue-900 dark:text-blue-300"
                      }`}>
                        {goulot.composante}
                      </h3>
                      <p className={`mt-1 text-sm ${
                        goulot.severite === "critique" ? "text-red-800 dark:text-red-200" :
                        goulot.severite === "élevée" ? "text-orange-800 dark:text-orange-200" :
                        goulot.severite === "modérée" ? "text-yellow-800 dark:text-yellow-200" :
                        "text-blue-800 dark:text-blue-200"
                      }`}>
                        {goulot.probleme}
                      </p>
                      <p className={`mt-2 text-xs font-medium ${
                        goulot.severite === "critique" ? "text-red-700 dark:text-red-300" :
                        goulot.severite === "élevée" ? "text-orange-700 dark:text-orange-300" :
                        goulot.severite === "modérée" ? "text-yellow-700 dark:text-yellow-300" :
                        "text-blue-700 dark:text-blue-300"
                      }`}>
                        💡 {goulot.recommandation}
                      </p>
                    </div>
                    <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      goulot.severite === "critique" ? "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200" :
                      goulot.severite === "élevée" ? "bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-200" :
                      goulot.severite === "modérée" ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200" :
                      "bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-200"
                    }`}>
                      {goulot.severite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
              <p className="text-sm font-medium text-green-900 dark:text-green-300">
                ✅ Aucun goulot d'étranglement critique détecté
              </p>
              <p className="mt-1 text-xs text-green-800 dark:text-green-200">
                L'aéroport fonctionne dans des conditions acceptables
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section 7 : ÉVALUATION - Recommandations (3 niveaux) */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="border-b border-zinc-200 bg-purple-50 px-6 py-4 dark:border-zinc-700 dark:bg-purple-950/30">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            7️⃣ Évaluation - Recommandations d'Optimisation
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            3 niveaux d'optimisation avec estimations
          </p>
        </div>
        <div className="p-6 space-y-4">
          {/* Optimisation légère */}
          {diagnostic.optimisationLegere && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
              <h3 className="font-medium text-green-900 dark:text-green-300">
                1️⃣ Optimisation Légère
              </h3>
              <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                Procédures, organisation, signalisation
              </p>
              <p className="mt-3 text-sm text-green-800 dark:text-green-200 whitespace-pre-line">
                {diagnostic.optimisationLegere}
              </p>
            </div>
          )}

          {/* Optimisation moyenne */}
          {diagnostic.optimisationMoyenne && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/30">
              <h3 className="font-medium text-yellow-900 dark:text-yellow-300">
                2️⃣ Optimisation Moyenne
              </h3>
              <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                Ajout de modules temporaires ou équipements
              </p>
              <p className="mt-3 text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-line">
                {diagnostic.optimisationMoyenne}
              </p>
            </div>
          )}

          {/* Optimisation lourde */}
          {diagnostic.optimisationLourde && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
              <h3 className="font-medium text-red-900 dark:text-red-300">
                3️⃣ Optimisation Lourde
              </h3>
              <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                Agrandissement, nouvelle infrastructure
              </p>
              <p className="mt-3 text-sm text-red-800 dark:text-red-200 whitespace-pre-line">
                {diagnostic.optimisationLourde}
              </p>
            </div>
          )}

          {/* Estimations */}
          {(diagnostic.estimationImpacts || diagnostic.estimationCouts) && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/30">
              <h3 className="font-medium text-purple-900 dark:text-purple-300">
                💰 Estimations
              </h3>
              {diagnostic.estimationCouts && (
                <div className="mt-3">
                  <p className="text-xs text-purple-700 dark:text-purple-400">
                    Coûts estimés
                  </p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                    {diagnostic.estimationCouts} M€
                  </p>
                </div>
              )}
              {diagnostic.estimationImpacts && (
                <p className="mt-3 text-sm text-purple-800 dark:text-purple-200 whitespace-pre-line">
                  {diagnostic.estimationImpacts}
                </p>
              )}
            </div>
          )}

          {!diagnostic.optimisationLegere && !diagnostic.optimisationMoyenne && !diagnostic.optimisationLourde && (
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Aucune recommandation d'optimisation renseignée
              </p>
            </div>
          )}
        </div>
      </div>
