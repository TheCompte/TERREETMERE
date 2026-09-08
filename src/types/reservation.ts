/**
 * Types pour le système de réservation Terre & Mer
 */

export interface ReservationData {
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM
  guests: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  confirmationCode?: string;
}
