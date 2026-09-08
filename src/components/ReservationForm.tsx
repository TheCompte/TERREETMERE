import { useState, type FormEvent } from "react";
import { restaurant } from "../data/restaurant";
import { submitReservation } from "../services/reservationService";
import type { ReservationData } from "../types/reservation";
import { ArrowRightIcon, CheckIcon, Overline, Reveal } from "./ui";

type FormErrors = Partial<Record<keyof ReservationData, string>>;

export default function ReservationForm() {
  const [formData, setFormData] = useState<ReservationData>({
    date: "",
    time: "",
    guests: 2,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.date) {
      newErrors.date = "Veuillez sélectionner une date";
    }

    if (!formData.time) {
      newErrors.time = "Veuillez sélectionner une heure";
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = "Veuillez indiquer le nombre de convives";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Veuillez indiquer votre prénom";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Veuillez indiquer votre nom";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Veuillez indiquer votre téléphone";
    } else if (!/^[0-9+\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Veuillez indiquer votre email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitReservation(
        formData,
        restaurant.reservation.mode
      );

      if (response.success) {
        setConfirmationCode(response.confirmationCode || "");
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      setErrors({
        firstName: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof ReservationData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Date minimum = aujourd'hui
  const today = new Date().toISOString().split("T")[0];

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-champagne-400/20">
          <CheckIcon className="h-10 w-10 text-champagne-400" />
        </div>
        <h3 className="font-display text-3xl font-light text-ivory-50 md:text-4xl">
          Merci pour votre demande
        </h3>
        <p className="mt-6 text-lg leading-relaxed text-marine-200">
          Votre demande de réservation a bien été enregistrée.
          {confirmationCode && (
            <span className="mt-2 block font-mono text-sm text-champagne-400">
              Code de confirmation : {confirmationCode}
            </span>
          )}
        </p>
        <div className="mt-8 rounded-lg border border-champagne-400/20 bg-marine-900/50 p-6 text-left">
          <p className="text-sm leading-relaxed text-marine-200">
            <strong className="font-semibold text-ivory-50">
              Ceci est une démonstration.
            </strong>{" "}
            La confirmation réelle sera envoyée par le restaurant une fois le
            système de réservation activé. Pour toute question, contactez-nous
            au{" "}
            <a
              href={restaurant.phone.href}
              className="text-champagne-400 hover:text-champagne-300"
            >
              {restaurant.phone.display}
            </a>
            .
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={restaurant.phone.href}
            className="inline-flex items-center justify-center gap-2 border border-champagne-400/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-champagne-400 transition-colors hover:bg-champagne-400/10"
          >
            Nous appeler
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                date: "",
                time: "",
                guests: 2,
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                message: "",
              });
            }}
            className="inline-flex items-center justify-center gap-2 bg-champagne-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-marine-950 transition-colors hover:bg-champagne-300"
          >
            Nouvelle réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8">
      {/* Date et heure */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            min={today}
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 placeholder-marine-400 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
              errors.date
                ? "border-red-400/60"
                : "border-champagne-400/20 focus:border-champagne-400"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-400">{errors.date}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="time"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
          >
            Heure
          </label>
          <select
            id="time"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
              errors.time
                ? "border-red-400/60"
                : "border-champagne-400/20 focus:border-champagne-400"
            }`}
          >
            <option value="">Sélectionnez une heure</option>
            {restaurant.reservation.times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="mt-1 text-xs text-red-400">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Nombre de convives */}
      <div>
        <label
          htmlFor="guests"
          className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
        >
          Nombre de convives
        </label>
        <select
          id="guests"
          value={formData.guests}
          onChange={(e) => handleChange("guests", parseInt(e.target.value))}
          className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
            errors.guests
              ? "border-red-400/60"
              : "border-champagne-400/20 focus:border-champagne-400"
          }`}
        >
          {Array.from({ length: restaurant.reservation.maxGuests }, (_, i) => i + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "personne" : "personnes"}
              </option>
            )
          )}
        </select>
        {errors.guests && (
          <p className="mt-1 text-xs text-red-400">{errors.guests}</p>
        )}
      </div>

      {/* Nom et prénom */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Jean"
            className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 placeholder-marine-400 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
              errors.firstName
                ? "border-red-400/60"
                : "border-champagne-400/20 focus:border-champagne-400"
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
          >
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Dupont"
            className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 placeholder-marine-400 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
              errors.lastName
                ? "border-red-400/60"
                : "border-champagne-400/20 focus:border-champagne-400"
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Téléphone et email */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
          >
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="06 12 34 56 78"
            className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 placeholder-marine-400 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
              errors.phone
                ? "border-red-400/60"
                : "border-champagne-400/20 focus:border-champagne-400"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="jean.dupont@email.com"
            className={`w-full border bg-marine-900/50 px-4 py-3 text-ivory-50 placeholder-marine-400 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne-400 ${
              errors.email
                ? "border-red-400/60"
                : "border-champagne-400/20 focus:border-champagne-400"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Message optionnel */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold uppercase tracking-wide text-marine-200"
        >
          Message (optionnel)
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Allergies, occasion spéciale, demande particulière..."
          className="w-full resize-none border border-champagne-400/20 bg-marine-900/50 px-4 py-3 text-ivory-50 placeholder-marine-400 transition-colors focus:border-champagne-400 focus:outline-none focus:ring-2 focus:ring-champagne-400"
        />
      </div>

      {/* Bouton de soumission */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 bg-champagne-400 px-8 py-4 text-sm font-bold uppercase tracking-[0.24em] text-marine-950 transition-all hover:bg-champagne-300 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Envoi en cours...
            </>
          ) : (
            <>
              Réserver une table
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
