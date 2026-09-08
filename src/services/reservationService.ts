/**
 * Service de réservation Terre & Mer
 *
 * Architecture prête pour un vrai backend :
 * - En mode "demo" : simule un envoi local avec un délai
 * - En mode "live" : à remplacer par un appel API réel
 *
 * Pour connecter un vrai backend, il suffit de remplacer
 * le corps de submitReservation() par un fetch() vers votre API.
 */

import type { ReservationData, ReservationResponse } from "../types/reservation";

/**
 * Soumet une demande de réservation.
 *
 * En mode "demo" : simule un envoi avec un délai de 1.2s
 * et retourne une confirmation fictive (aucune donnée n'est
 * réellement envoyée ni stockée).
 *
 * En mode "live" : à implémenter avec votre backend.
 */
export async function submitReservation(
  data: ReservationData,
  mode: "demo" | "live" = "demo"
): Promise<ReservationResponse> {
  if (mode === "demo") {
    // Simulation d'un appel réseau
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Génération d'un code de confirmation fictif pour le démo
    const confirmationCode = `TM-${Date.now().toString(36).toUpperCase().slice(-6)}`;

    // Log en console pour faciliter le debug pendant la démo
    console.log("[DEMO] Réservation Terre & Mer :", {
      ...data,
      confirmationCode,
    });

    return {
      success: true,
      message:
        "Votre demande de réservation a bien été enregistrée. Ceci est une démonstration — la confirmation réelle sera envoyée par le restaurant une fois le système activé.",
      confirmationCode,
    };
  }

  // Mode "live" : à implémenter
  // Exemple :
  // const response = await fetch("/api/reservations", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  throw new Error(
    "Mode de réservation 'live' non configuré. Veuillez implémenter l'appel backend dans src/services/reservationService.ts."
  );
}
