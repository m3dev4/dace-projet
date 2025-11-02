/*
  Warnings:

  - You are about to drop the column `fluxPassagers` on the `diagnostics` table. All the data in the column will be lost.
  - You are about to drop the column `pistes` on the `diagnostics` table. All the data in the column will be lost.
  - You are about to drop the column `postesAeronefs` on the `diagnostics` table. All the data in the column will be lost.
  - You are about to drop the column `terminaux` on the `diagnostics` table. All the data in the column will be lost.
  - You are about to drop the column `tourControle` on the `diagnostics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "diagnostics" DROP COLUMN "fluxPassagers",
DROP COLUMN "pistes",
DROP COLUMN "postesAeronefs",
DROP COLUMN "terminaux",
DROP COLUMN "tourControle",
ADD COLUMN     "capaciteHorairePistes" DOUBLE PRECISION,
ADD COLUMN     "capacitePassagersAn" INTEGER,
ADD COLUMN     "cheminementPassagers" TEXT,
ADD COLUMN     "codeIATA" TEXT,
ADD COLUMN     "codeICAO" TEXT,
ADD COLUMN     "contraintesStructurelles" TEXT,
ADD COLUMN     "donneesLocales" TEXT,
ADD COLUMN     "estimationCouts" DOUBLE PRECISION,
ADD COLUMN     "estimationImpacts" TEXT,
ADD COLUMN     "exigencesConfort" TEXT,
ADD COLUMN     "fluxPassagersHeurePte" DOUBLE PRECISION,
ADD COLUMN     "hauteurTourControle" INTEGER,
ADD COLUMN     "longueurPistePrincipale" INTEGER,
ADD COLUMN     "niveauxSecurite" TEXT,
ADD COLUMN     "nombrePistes" INTEGER,
ADD COLUMN     "nombrePostesContact" INTEGER,
ADD COLUMN     "nombrePostesDistants" INTEGER,
ADD COLUMN     "nombrePostesTotal" INTEGER,
ADD COLUMN     "nombreTerminaux" INTEGER,
ADD COLUMN     "normesOACIIATA" TEXT,
ADD COLUMN     "optimisationLegere" TEXT,
ADD COLUMN     "optimisationLourde" TEXT,
ADD COLUMN     "optimisationMoyenne" TEXT,
ADD COLUMN     "passagersAnActuel" INTEGER,
ADD COLUMN     "periodesPointe" TEXT,
ADD COLUMN     "pointsFriction" TEXT,
ADD COLUMN     "routageAvions" TEXT,
ADD COLUMN     "tauxOccupation" DOUBLE PRECISION,
ADD COLUMN     "tauxSaturation" DOUBLE PRECISION,
ADD COLUMN     "tempsMoyenTraitement" DOUBLE PRECISION,
ADD COLUMN     "volsReguliers" INTEGER;
