import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export function logError(context, error) {
  const message = error?.message ?? String(error);
  console.error(`[${context}]`, message);
}

export function toUserMessage(error, fallback = ERROR_MESSAGES.unknown) {
  if (!error) return fallback;
  const msg = typeof error === "string" ? error : error.message;
  // Mensajes técnicos de fetchData empiezan con "Error " + número.
  if (/^Error \d{3}:/.test(msg)) return fallback;
  return msg || fallback;
}
