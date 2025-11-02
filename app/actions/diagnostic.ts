"use server";

import { prisma } from "@/lib/prisma";
import { diagnosticSchema, type DiagnosticInput } from "@/lib/validations/diagnostic";
import { revalidatePath } from "next/cache";

/**
 * Type de retour pour les actions serveur
 */
type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
};

/**
 * Server Action pour créer un nouveau diagnostic
 * 
 * @param formData - Données du formulaire (peut être FormData ou objet)
 * @returns Résultat de l'opération avec les données créées ou les erreurs
 * 
 * @example
 * ```ts
 * const result = await createDiagnostic(formData);
 * if (result.success) {
 *   console.log("Diagnostic créé:", result.data);
 * } else {
 *   console.error("Erreur:", result.error);
 * }
 * ```
 */
export async function createDiagnostic(
  formData: FormData | DiagnosticInput
): Promise<ActionResult> {
  try {
    // Conversion de FormData en objet si nécessaire
    let data: Partial<DiagnosticInput>;

    if (formData instanceof FormData) {
      // Helper pour convertir les valeurs FormData
      const getString = (key: string) => {
        const val = formData.get(key);
        return val === "" || val === null ? undefined : String(val);
      };

      const getNumber = (key: string) => {
        const val = formData.get(key);
        if (val === "" || val === null) return null;
        const num = Number(val);
        return isNaN(num) ? null : num;
      };

      data = {
        // Informations générales
        nomAeroport: formData.get("nomAeroport") as string,
        localisation: formData.get("localisation") as string,
        codeIATA: getString("codeIATA"),
        codeICAO: getString("codeICAO"),
        dateDiagnostic: formData.get("dateDiagnostic")
          ? new Date(formData.get("dateDiagnostic") as string)
          : new Date(),

        // Composantes physiques (numériques)
        nombrePistes: getNumber("nombrePistes"),
        capaciteHorairePistes: getNumber("capaciteHorairePistes"),
        longueurPistePrincipale: getNumber("longueurPistePrincipale"),
        nombreTerminaux: getNumber("nombreTerminaux"),
        capacitePassagersAn: getNumber("capacitePassagersAn"),
        fluxPassagersHeurePte: getNumber("fluxPassagersHeurePte"),
        nombrePostesTotal: getNumber("nombrePostesTotal"),
        nombrePostesContact: getNumber("nombrePostesContact"),
        nombrePostesDistants: getNumber("nombrePostesDistants"),
        hauteurTourControle: getNumber("hauteurTourControle"),

        // KPI
        tauxSaturation: getNumber("tauxSaturation"),
        tauxOccupation: getNumber("tauxOccupation"),
        tempsMoyenTraitement: getNumber("tempsMoyenTraitement"),
        passagersAnActuel: getNumber("passagersAnActuel"),
        volsReguliers: getNumber("volsReguliers"),
        periodesPointe: getString("periodesPointe"),

        // Composantes fonctionnelles (texte)
        cheminementPassagers: getString("cheminementPassagers"),
        routageAvions: getString("routageAvions"),
        normesOACIIATA: getString("normesOACIIATA"),
        niveauxSecurite: getString("niveauxSecurite"),
        exigencesConfort: getString("exigencesConfort"),
        pointsFriction: getString("pointsFriction"),
        equipementsSecurite: getString("equipementsSecurite"),
        servicesTechniques: getString("servicesTechniques"),

        // Optimisation
        optimisationLegere: getString("optimisationLegere"),
        optimisationMoyenne: getString("optimisationMoyenne"),
        optimisationLourde: getString("optimisationLourde"),
        estimationImpacts: getString("estimationImpacts"),
        estimationCouts: getNumber("estimationCouts"),

        // Observations
        notesObservation: getString("notesObservation"),
        contraintesStructurelles: getString("contraintesStructurelles"),
        donneesLocales: getString("donneesLocales"),
      };
    } else {
      data = formData;
    }

    // Validation des données avec Zod
    const validatedData = diagnosticSchema.parse(data);

    // Conversion pour la base de données (Zod gère déjà les nullables)
    const dbData = {
      ...validatedData,
      // Conversion des chaînes vides en null pour les champs optionnels
      codeIATA: validatedData.codeIATA || null,
      codeICAO: validatedData.codeICAO || null,
      periodesPointe: validatedData.periodesPointe || null,
      cheminementPassagers: validatedData.cheminementPassagers || null,
      routageAvions: validatedData.routageAvions || null,
      normesOACIIATA: validatedData.normesOACIIATA || null,
      niveauxSecurite: validatedData.niveauxSecurite || null,
      exigencesConfort: validatedData.exigencesConfort || null,
      pointsFriction: validatedData.pointsFriction || null,
      equipementsSecurite: validatedData.equipementsSecurite || null,
      servicesTechniques: validatedData.servicesTechniques || null,
      optimisationLegere: validatedData.optimisationLegere || null,
      optimisationMoyenne: validatedData.optimisationMoyenne || null,
      optimisationLourde: validatedData.optimisationLourde || null,
      estimationImpacts: validatedData.estimationImpacts || null,
      notesObservation: validatedData.notesObservation || null,
      contraintesStructurelles: validatedData.contraintesStructurelles || null,
      donneesLocales: validatedData.donneesLocales || null,
    };

    // Création du diagnostic dans la base de données
    const diagnostic = await prisma.diagnostic.create({
      data: dbData,
    });

    // Revalidation de la page pour afficher les nouvelles données
    revalidatePath("/diagnostic");
    revalidatePath("/dashboard");

    return {
      success: true,
      data: diagnostic,
    };
  } catch (error) {
    // Gestion des erreurs de validation Zod
    if (error instanceof Error && error.name === "ZodError") {
      const zodError = error as any;
      const fieldErrors: Record<string, string[]> = {};

      zodError.errors?.forEach((err: any) => {
        const field = err.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(err.message);
      });

      return {
        success: false,
        error: "Erreur de validation des données",
        errors: fieldErrors,
      };
    }

    // Gestion des autres erreurs
    console.error("Erreur lors de la création du diagnostic:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur inattendue s'est produite",
    };
  }
}

/**
 * Server Action pour récupérer tous les diagnostics
 * 
 * @returns Liste de tous les diagnostics triés par date de création décroissante
 */
export async function getDiagnostics(): Promise<ActionResult> {
  try {
    const diagnostics = await prisma.diagnostic.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: diagnostics,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des diagnostics:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la récupération des diagnostics",
    };
  }
}

/**
 * Server Action pour récupérer un diagnostic par son ID
 * 
 * @param id - ID du diagnostic à récupérer
 * @returns Le diagnostic trouvé ou une erreur
 */
export async function getDiagnosticById(id: string): Promise<ActionResult> {
  try {
    const diagnostic = await prisma.diagnostic.findUnique({
      where: { id },
    });

    if (!diagnostic) {
      return {
        success: false,
        error: "Diagnostic non trouvé",
      };
    }

    return {
      success: true,
      data: diagnostic,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du diagnostic:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erreur lors de la récupération du diagnostic",
    };
  }
}
