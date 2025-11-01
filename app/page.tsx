import { redirect } from "next/navigation";

/**
 * Page d'accueil
 * Redirige automatiquement vers le dashboard
 */
export default function Home() {
  redirect("/dashboard");
}
