/**
 * Calculs et statistiques pour le dashboard
 */

export interface DiagnosticStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
  averageSaturation: number | null;
  averageOccupation: number | null;
  totalCapacity: number;
  totalTraffic: number;
  criticalAirports: number;
  topPerformers: Array<{
    id: string;
    nom: string;
    score: number;
  }>;
  bottomPerformers: Array<{
    id: string;
    nom: string;
    score: number;
  }>;
  byRegion: Record<string, number>;
}

export function calculateDashboardStats(diagnostics: any[]): DiagnosticStats {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Filtres temporels
  const thisWeek = diagnostics.filter(
    (d) => new Date(d.createdAt) >= weekAgo
  ).length;
  const thisMonth = diagnostics.filter(
    (d) => new Date(d.createdAt) >= monthAgo
  ).length;

  // Moyennes des KPI
  const saturations = diagnostics
    .filter((d) => d.tauxSaturation !== null)
    .map((d) => d.tauxSaturation);
  const averageSaturation =
    saturations.length > 0
      ? Math.round(
          saturations.reduce((a, b) => a + b, 0) / saturations.length
        )
      : null;

  const occupations = diagnostics
    .filter((d) => d.tauxOccupation !== null)
    .map((d) => d.tauxOccupation);
  const averageOccupation =
    occupations.length > 0
      ? Math.round(
          occupations.reduce((a, b) => a + b, 0) / occupations.length
        )
      : null;

  // Capacités totales
  const totalCapacity = diagnostics
    .filter((d) => d.capacitePassagersAn)
    .reduce((sum, d) => sum + (d.capacitePassagersAn || 0) * 1000, 0);

  const totalTraffic = diagnostics
    .filter((d) => d.passagersAnActuel)
    .reduce((sum, d) => sum + (d.passagersAnActuel || 0), 0);

  // Aéroports critiques (saturation > 90%)
  const criticalAirports = diagnostics.filter(
    (d) => d.tauxSaturation && d.tauxSaturation > 90
  ).length;

  // Top et Bottom performers (basé sur taux de saturation inversé)
  const withScores = diagnostics
    .filter((d) => d.tauxSaturation !== null)
    .map((d) => ({
      id: d.id,
      nom: d.nomAeroport,
      score: 100 - (d.tauxSaturation || 0), // Score élevé = faible saturation = bon
    }))
    .sort((a, b) => b.score - a.score);

  const topPerformers = withScores.slice(0, 3);
  const bottomPerformers = withScores.slice(-3).reverse();

  // Répartition par région (extraction basique de la localisation)
  const byRegion: Record<string, number> = {};
  diagnostics.forEach((d) => {
    if (d.localisation) {
      // Extraire la région (supposons format "Ville, Région")
      const parts = d.localisation.split(",");
      const region = parts.length > 1 ? parts[1].trim() : parts[0].trim();
      byRegion[region] = (byRegion[region] || 0) + 1;
    }
  });

  return {
    total: diagnostics.length,
    thisWeek,
    thisMonth,
    averageSaturation,
    averageOccupation,
    totalCapacity,
    totalTraffic,
    criticalAirports,
    topPerformers,
    bottomPerformers,
    byRegion,
  };
}

export function getHealthStatus(saturation: number | null): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (saturation === null) {
    return {
      label: "Inconnu",
      color: "text-zinc-600 dark:text-zinc-400",
      bgColor: "bg-zinc-100 dark:bg-zinc-800",
    };
  }

  if (saturation < 60) {
    return {
      label: "Excellent",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    };
  }

  if (saturation < 75) {
    return {
      label: "Bon",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    };
  }

  if (saturation < 90) {
    return {
      label: "Attention",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    };
  }

  return {
    label: "Critique",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-950",
  };
}
