/**
 * Utilitaires de calcul selon la méthodologie DACE
 * Formules simplifiées et facilement compréhensibles
 */

import { Diagnostic } from "@prisma/client";

/**
 * Calcul de la capacité horaire des pistes selon FAA
 * Formule simplifiée : basée sur le nombre de pistes et la capacité déclarée
 */
export function calculerCapaciteHorairePistes(diagnostic: Diagnostic): {
  capaciteHoraire: number | null;
  source: string;
} {
  if (diagnostic.capaciteHorairePistes) {
    return {
      capaciteHoraire: diagnostic.capaciteHorairePistes,
      source: "Déclarée",
    };
  }

  // Estimation si non fournie : ~40-60 mvts/h par piste
  if (diagnostic.nombrePistes) {
    return {
      capaciteHoraire: diagnostic.nombrePistes * 50,
      source: "Estimée (50 mvts/h par piste)",
    };
  }

  return { capaciteHoraire: null, source: "Non disponible" };
}

/**
 * Calcul du taux de saturation
 * Formule : (Trafic actuel / Capacité) × 100
 */
export function calculerTauxSaturation(diagnostic: Diagnostic): {
  taux: number | null;
  niveau: "faible" | "modéré" | "élevé" | "critique" | null;
  couleur: string;
} {
  // Si déjà fourni, l'utiliser
  if (diagnostic.tauxSaturation !== null) {
    return {
      taux: diagnostic.tauxSaturation,
      niveau: getNiveauSaturation(diagnostic.tauxSaturation),
      couleur: getCouleurSaturation(diagnostic.tauxSaturation),
    };
  }

  // Calcul si on a les données
  if (diagnostic.passagersAnActuel && diagnostic.capacitePassagersAn) {
    const taux = (diagnostic.passagersAnActuel / (diagnostic.capacitePassagersAn * 1000)) * 100;
    return {
      taux: Math.round(taux * 10) / 10,
      niveau: getNiveauSaturation(taux),
      couleur: getCouleurSaturation(taux),
    };
  }

  return { taux: null, niveau: null, couleur: "gray" };
}

/**
 * Calcul du taux d'occupation
 */
export function calculerTauxOccupation(diagnostic: Diagnostic): {
  taux: number | null;
  niveau: "faible" | "modéré" | "élevé" | "critique" | null;
  couleur: string;
} {
  if (diagnostic.tauxOccupation !== null) {
    return {
      taux: diagnostic.tauxOccupation,
      niveau: getNiveauSaturation(diagnostic.tauxOccupation),
      couleur: getCouleurSaturation(diagnostic.tauxOccupation),
    };
  }

  return { taux: null, niveau: null, couleur: "gray" };
}

/**
 * Calcul de la capacité résiduelle
 * Formule : Capacité totale - Trafic actuel
 */
export function calculerCapaciteResiduelle(diagnostic: Diagnostic): {
  residuelle: number | null;
  pourcentage: number | null;
  unite: string;
} {
  if (diagnostic.capacitePassagersAn && diagnostic.passagersAnActuel) {
    const capaciteTotale = diagnostic.capacitePassagersAn * 1000; // en milliers
    const residuelle = capaciteTotale - diagnostic.passagersAnActuel;
    const pourcentage = (residuelle / capaciteTotale) * 100;

    return {
      residuelle: Math.round(residuelle),
      pourcentage: Math.round(pourcentage * 10) / 10,
      unite: "k passagers/an",
    };
  }

  return { residuelle: null, pourcentage: null, unite: "k passagers/an" };
}

/**
 * Calcul du ratio postes par terminal
 */
export function calculerRatioPostesTerminal(diagnostic: Diagnostic): {
  ratio: number | null;
  interpretation: string;
} {
  if (diagnostic.nombrePostesTotal && diagnostic.nombreTerminaux) {
    const ratio = diagnostic.nombrePostesTotal / diagnostic.nombreTerminaux;
    let interpretation = "";

    if (ratio < 15) {
      interpretation = "Faible : Risque de congestion";
    } else if (ratio < 25) {
      interpretation = "Correct : Configuration standard";
    } else if (ratio < 35) {
      interpretation = "Bon : Capacité confortable";
    } else {
      interpretation = "Excellent : Large capacité";
    }

    return {
      ratio: Math.round(ratio * 10) / 10,
      interpretation,
    };
  }

  return { ratio: null, interpretation: "Données insuffisantes" };
}

/**
 * Identification des goulots d'étranglement
 * Analyse comparative des différentes composantes
 */
export function identifierGoulots(diagnostic: Diagnostic): Array<{
  composante: string;
  probleme: string;
  severite: "faible" | "modérée" | "élevée" | "critique";
  recommandation: string;
}> {
  const goulots: Array<{
    composante: string;
    probleme: string;
    severite: "faible" | "modérée" | "élevée" | "critique";
    recommandation: string;
  }> = [];

  // Vérifier la saturation globale
  const saturation = calculerTauxSaturation(diagnostic);
  if (saturation.taux !== null) {
    if (saturation.taux > 90) {
      goulots.push({
        composante: "Capacité globale",
        probleme: `Saturation critique : ${saturation.taux}%`,
        severite: "critique",
        recommandation: "Extension urgente requise",
      });
    } else if (saturation.taux > 75) {
      goulots.push({
        composante: "Capacité globale",
        probleme: `Saturation élevée : ${saturation.taux}%`,
        severite: "élevée",
        recommandation: "Planifier extension à court terme",
      });
    }
  }

  // Vérifier le ratio postes/terminal
  const ratioPostes = calculerRatioPostesTerminal(diagnostic);
  if (ratioPostes.ratio !== null && ratioPostes.ratio < 15) {
    goulots.push({
      composante: "Postes de stationnement",
      probleme: `Ratio insuffisant : ${ratioPostes.ratio} postes/terminal`,
      severite: "élevée",
      recommandation: "Augmenter le nombre de postes",
    });
  }

  // Vérifier l'occupation
  const occupation = calculerTauxOccupation(diagnostic);
  if (occupation.taux !== null && occupation.taux > 85) {
    goulots.push({
      composante: "Taux d'occupation",
      probleme: `Occupation élevée : ${occupation.taux}%`,
      severite: occupation.taux > 95 ? "critique" : "élevée",
      recommandation: "Optimiser les flux et horaires",
    });
  }

  // Analyser les points de friction déclarés
  if (diagnostic.pointsFriction) {
    goulots.push({
      composante: "Points de friction identifiés",
      probleme: diagnostic.pointsFriction.substring(0, 100) + "...",
      severite: "modérée",
      recommandation: "Voir analyse détaillée des flux",
    });
  }

  return goulots;
}

/**
 * Calcul du score global de performance (0-100)
 * Basé sur les KPI essentiels
 */
export function calculerScoreGlobal(diagnostic: Diagnostic): {
  score: number;
  niveau: "faible" | "moyen" | "bon" | "excellent";
  details: Record<string, number>;
} {
  let scoreTotal = 0;
  let nbCriteres = 0;
  const details: Record<string, number> = {};

  // Score capacité (0-25 points)
  const saturation = calculerTauxSaturation(diagnostic);
  if (saturation.taux !== null) {
    const scoreCapa = Math.max(0, 25 - (saturation.taux / 100) * 25);
    details["Capacité"] = Math.round(scoreCapa);
    scoreTotal += scoreCapa;
    nbCriteres++;
  }

  // Score occupation (0-25 points)
  const occupation = calculerTauxOccupation(diagnostic);
  if (occupation.taux !== null) {
    const scoreOcc = Math.max(0, 25 - (occupation.taux / 100) * 25);
    details["Occupation"] = Math.round(scoreOcc);
    scoreTotal += scoreOcc;
    nbCriteres++;
  }

  // Score infrastructure (0-25 points)
  if (diagnostic.nombrePistes && diagnostic.nombreTerminaux && diagnostic.nombrePostesTotal) {
    const ratioPostes = calculerRatioPostesTerminal(diagnostic);
    const scoreInfra = ratioPostes.ratio ? Math.min(25, (ratioPostes.ratio / 30) * 25) : 15;
    details["Infrastructure"] = Math.round(scoreInfra);
    scoreTotal += scoreInfra;
    nbCriteres++;
  }

  // Score conformité (0-25 points)
  const scoreConf = diagnostic.normesOACIIATA ? 20 : 10;
  details["Conformité"] = scoreConf;
  scoreTotal += scoreConf;
  nbCriteres++;

  const scoreFinal = nbCriteres > 0 ? Math.round((scoreTotal / nbCriteres)) : 50;

  let niveau: "faible" | "moyen" | "bon" | "excellent";
  if (scoreFinal >= 80) niveau = "excellent";
  else if (scoreFinal >= 65) niveau = "bon";
  else if (scoreFinal >= 50) niveau = "moyen";
  else niveau = "faible";

  return { score: scoreFinal, niveau, details };
}

// Fonctions utilitaires
function getNiveauSaturation(taux: number): "faible" | "modéré" | "élevé" | "critique" {
  if (taux < 60) return "faible";
  if (taux < 75) return "modéré";
  if (taux < 90) return "élevé";
  return "critique";
}

function getCouleurSaturation(taux: number): string {
  if (taux < 60) return "green";
  if (taux < 75) return "yellow";
  if (taux < 90) return "orange";
  return "red";
}
