import { type ClassValue, clsx } from "clsx";

/**
 * Utilitaire pour fusionner les classes CSS de manière conditionnelle
 * Combine clsx pour gérer les conditions et permet une meilleure gestion des classes Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
