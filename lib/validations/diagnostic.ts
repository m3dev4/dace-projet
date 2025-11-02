import { z } from "zod";

/**
 * Schéma de validation pour la création d'un diagnostic selon la méthodologie DACE
 * Définit les règles de validation pour tous les champs du formulaire
 * Utilise des types numériques (Int, Float) pour les données quantitatives
 */
export const diagnosticSchema = z.object({
  // ========== INFORMATIONS GÉNÉRALES (obligatoires) ==========
  nomAeroport: z
    .string()
    .min(2, "Le nom de l'aéroport doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'aéroport ne peut pas dépasser 100 caractères"),

  localisation: z
    .string()
    .min(2, "La localisation doit contenir au moins 2 caractères")
    .max(200, "La localisation ne peut pas dépasser 200 caractères"),

  codeIATA: z
    .string()
    .length(3, "Le code IATA doit contenir exactement 3 caractères")
    .regex(/^[A-Z]{3}$/, "Le code IATA doit contenir uniquement des lettres majuscules")
    .optional()
    .or(z.literal("")),

  codeICAO: z
    .string()
    .length(4, "Le code ICAO doit contenir exactement 4 caractères")
    .regex(/^[A-Z]{4}$/, "Le code ICAO doit contenir uniquement des lettres majuscules")
    .optional()
    .or(z.literal("")),

  dateDiagnostic: z.coerce.date({
    message: "La date du diagnostic est requise",
  }),

  // ========== COMPOSANTES PHYSIQUES (Quantitatives) ==========
  
  // Pistes
  nombrePistes: z.coerce
    .number()
    .int("Le nombre de pistes doit être un entier")
    .positive("Le nombre de pistes doit être positif")
    .max(20, "Le nombre de pistes semble irréaliste")
    .optional()
    .nullable(),

  capaciteHorairePistes: z.coerce
    .number()
    .positive("La capacité horaire doit être positive")
    .max(500, "La capacité horaire semble irréaliste")
    .optional()
    .nullable(),

  longueurPistePrincipale: z.coerce
    .number()
    .int("La longueur doit être un entier")
    .positive("La longueur doit être positive")
    .max(10000, "La longueur semble irréaliste")
    .optional()
    .nullable(),

  // Terminaux
  nombreTerminaux: z.coerce
    .number()
    .int("Le nombre de terminaux doit être un entier")
    .positive("Le nombre de terminaux doit être positif")
    .max(20, "Le nombre de terminaux semble irréaliste")
    .optional()
    .nullable(),

  capacitePassagersAn: z.coerce
    .number()
    .int("La capacité doit être un entier")
    .positive("La capacité doit être positive")
    .optional()
    .nullable(),

  fluxPassagersHeurePte: z.coerce
    .number()
    .positive("Le flux doit être positif")
    .optional()
    .nullable(),

  // Postes aéronefs
  nombrePostesTotal: z.coerce
    .number()
    .int("Le nombre de postes doit être un entier")
    .positive("Le nombre de postes doit être positif")
    .optional()
    .nullable(),

  nombrePostesContact: z.coerce
    .number()
    .int("Le nombre de postes doit être un entier")
    .positive("Le nombre de postes doit être positif")
    .optional()
    .nullable(),

  nombrePostesDistants: z.coerce
    .number()
    .int("Le nombre de postes doit être un entier")
    .positive("Le nombre de postes doit être positif")
    .optional()
    .nullable(),

  // Tour de contrôle
  hauteurTourControle: z.coerce
    .number()
    .int("La hauteur doit être un entier")
    .positive("La hauteur doit être positive")
    .max(200, "La hauteur semble irréaliste")
    .optional()
    .nullable(),

  // ========== INDICATEURS DE PERFORMANCE (KPI) ==========
  
  // Taux et ratios
  tauxSaturation: z.coerce
    .number()
    .min(0, "Le taux ne peut pas être négatif")
    .max(200, "Le taux ne peut pas dépasser 200%")
    .optional()
    .nullable(),

  tauxOccupation: z.coerce
    .number()
    .min(0, "Le taux ne peut pas être négatif")
    .max(100, "Le taux ne peut pas dépasser 100%")
    .optional()
    .nullable(),

  tempsMoyenTraitement: z.coerce
    .number()
    .positive("Le temps doit être positif")
    .max(1000, "Le temps semble irréaliste")
    .optional()
    .nullable(),

  // Trafic actuel
  passagersAnActuel: z.coerce
    .number()
    .int("Le nombre de passagers doit être un entier")
    .positive("Le nombre de passagers doit être positif")
    .optional()
    .nullable(),

  volsReguliers: z.coerce
    .number()
    .int("Le nombre de vols doit être un entier")
    .positive("Le nombre de vols doit être positif")
    .optional()
    .nullable(),

  periodesPointe: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  // ========== COMPOSANTES FONCTIONNELLES (Qualitatives) ==========
  
  // Flux et cheminements
  cheminementPassagers: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  routageAvions: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  // Sécurité et normes
  normesOACIIATA: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  niveauxSecurite: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  exigencesConfort: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  // Points de friction
  pointsFriction: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  // Équipements techniques
  equipementsSecurite: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  servicesTechniques: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  // ========== ÉVALUATION ET OPTIMISATION ==========
  
  // Scénarios d'optimisation
  optimisationLegere: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  optimisationMoyenne: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  optimisationLourde: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  // Estimations
  estimationImpacts: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  estimationCouts: z.coerce
    .number()
    .positive("Le coût doit être positif")
    .optional()
    .nullable(),

  // ========== OBSERVATIONS ET MÉTADONNÉES ==========
  
  notesObservation: z
    .string()
    .max(2000, "Les notes ne peuvent pas dépasser 2000 caractères")
    .optional()
    .or(z.literal("")),

  contraintesStructurelles: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),

  donneesLocales: z
    .string()
    .max(1000, "La description ne peut pas dépasser 1000 caractères")
    .optional()
    .or(z.literal("")),
});

/**
 * Type TypeScript inféré du schéma de validation
 */
export type DiagnosticInput = z.infer<typeof diagnosticSchema>;
