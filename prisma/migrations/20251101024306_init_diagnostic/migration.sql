-- CreateTable
CREATE TABLE "diagnostics" (
    "id" TEXT NOT NULL,
    "nomAeroport" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "pistes" TEXT,
    "terminaux" TEXT,
    "postesAeronefs" TEXT,
    "tourControle" TEXT,
    "fluxPassagers" TEXT,
    "equipementsSecurite" TEXT,
    "servicesTechniques" TEXT,
    "notesObservation" TEXT,
    "dateDiagnostic" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnostics_pkey" PRIMARY KEY ("id")
);
