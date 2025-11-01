import { z } from "zod";

/**
 * Schéma de validation pour la création d'un diagnostic
 * Définit les règles de validation pour tous les champs du formulaire
 */
export const diagnosticSchema = z.object({
  // Informations générales (obligatoires)
  nomAeroport: z
    .string()
    .min(2, "Le nom de l'aéroport doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'aéroport ne peut pas dépasser 100 caractères"),

  localisation: z
    .string()
    .min(2, "La localisation doit contenir au moins 2 caractères")
    .max(200, "La localisation ne peut pas dépasser 200 caractères"),

  // Composantes physiques (optionnelles)
  pistes: z
    .string()
    .max(500, "La description des pistes ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  terminaux: z
    .string()
    .max(500, "La description des terminaux ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  postesAeronefs: z
    .string()
    .max(500, "La description des postes aéronefs ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  tourControle: z
    .string()
    .max(500, "La description de la tour de contrôle ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  // Composantes fonctionnelles (optionnelles)
  fluxPassagers: z
    .string()
    .max(500, "La description des flux passagers ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  equipementsSecurite: z
    .string()
    .max(500, "La description des équipements de sécurité ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  servicesTechniques: z
    .string()
    .max(500, "La description des services techniques ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),

  // Observations (optionnelles)
  notesObservation: z
    .string()
    .max(2000, "Les notes d'observation ne peuvent pas dépasser 2000 caractères")
    .optional()
    .or(z.literal("")),

  dateDiagnostic: z.coerce.date({
    message: "La date du diagnostic est requise",
  }),
});

/**
 * Type TypeScript inféré du schéma de validation
 */
export type DiagnosticInput = z.infer<typeof diagnosticSchema>;
