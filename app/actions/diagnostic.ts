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
      data = {
        nomAeroport: formData.get("nomAeroport") as string,
        localisation: formData.get("localisation") as string,
        pistes: formData.get("pistes") as string | undefined,
        terminaux: formData.get("terminaux") as string | undefined,
        postesAeronefs: formData.get("postesAeronefs") as string | undefined,
        tourControle: formData.get("tourControle") as string | undefined,
        fluxPassagers: formData.get("fluxPassagers") as string | undefined,
        equipementsSecurite: formData.get("equipementsSecurite") as string | undefined,
        servicesTechniques: formData.get("servicesTechniques") as string | undefined,
        notesObservation: formData.get("notesObservation") as string | undefined,
        dateDiagnostic: formData.get("dateDiagnostic")
          ? new Date(formData.get("dateDiagnostic") as string)
          : new Date(),
      };
    } else {
      data = formData;
    }

    // Validation des données avec Zod
    const validatedData = diagnosticSchema.parse(data);

    // Conversion des chaînes vides en null pour la base de données
    const dbData = {
      nomAeroport: validatedData.nomAeroport,
      localisation: validatedData.localisation,
      pistes: validatedData.pistes || null,
      terminaux: validatedData.terminaux || null,
      postesAeronefs: validatedData.postesAeronefs || null,
      tourControle: validatedData.tourControle || null,
      fluxPassagers: validatedData.fluxPassagers || null,
      equipementsSecurite: validatedData.equipementsSecurite || null,
      servicesTechniques: validatedData.servicesTechniques || null,
      notesObservation: validatedData.notesObservation || null,
      dateDiagnostic: validatedData.dateDiagnostic,
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
