// src/lib/i18n/dictionaries/assistant.ts
// Spiritual Assistant chat widget (client component, on every page).
// The UI follows the page locale; the reply language follows what the person
// writes (see src/lib/i18n/reply-language.ts).
import { defineDictionary, type Translation } from "../dictionary";

const en = {
  openLabel: "Spiritual Assistant",
  openAria: "Open Spiritual Assistant",
  title: "Spiritual Assistant",
  clearAria: "Clear conversation",
  clearTitle: "Clear chat (keeps widget open)",
  closeAria: "Close chat",
  closeTitle: "Close (conversation is saved)",
  quickActions: "Quick Actions",
  actions: {
    prayer: "Generate a Prayer",
    verse: "Find a Verse",
    devotional: "Daily Devotional",
  },
  save: "Save Conversation",
  saved: "Saved — you can access this later.",
  download: "Download (.txt)",
  clear: "Clear chat",
  thinking: "Thinking...",
  placeholder: "Ask a spiritual question...",
  send: "Send",
  footnote: "Your conversation is not saved unless you click Save.",
  greeting:
    "Hello! I'm your Faith Companion AI assistant. I can help with Scripture-based encouragement, short prayers, and faith questions. What would you like help with today?",
  greetingAfterClear: "Hello! I'm your Faith Companion AI assistant. How can I help you today?",
  // Shown on English pages only, as its own lang="es" line under the greeting.
  spanishOffer: "También puedo responder en español." as string | null,
  limitReached: "You've reached your daily limit. Please try again tomorrow.",
  genericError: null as string | null, // English shows the server's message
  fallbackError: "Something went wrong. Please try again.",
  offline: "I couldn't reach the server. Please check your connection and try again.",
  you: "You",
  assistant: "Assistant",
};

const es: Translation<typeof en> = {
  openLabel: "Asistente espiritual",
  openAria: "Abrir el Asistente espiritual",
  title: "Asistente espiritual",
  clearAria: "Borrar la conversación",
  clearTitle: "Borrar el chat (el asistente sigue abierto)",
  closeAria: "Cerrar el chat",
  closeTitle: "Cerrar (la conversación se guarda)",
  quickActions: "Acciones rápidas",
  actions: {
    prayer: "Generar una oración",
    verse: "Buscar un versículo",
    devotional: "Devocional diario",
  },
  save: "Guardar conversación",
  saved: "Guardada: puedes verla más tarde.",
  download: "Descargar (.txt)",
  clear: "Borrar chat",
  thinking: "Pensando...",
  placeholder: "Haz una pregunta espiritual...",
  send: "Enviar",
  footnote: "Tu conversación no se guarda a menos que hagas clic en Guardar.",
  greeting:
    "¡Hola! Soy tu asistente de Faith Companion AI. Puedo ayudarte con ánimo basado en las Escrituras, oraciones breves y preguntas de fe. ¿En qué te puedo ayudar hoy?",
  greetingAfterClear: "¡Hola! Soy tu asistente de Faith Companion AI. ¿Cómo te puedo ayudar hoy?",
  spanishOffer: null,
  limitReached: "Llegaste a tu límite diario. Inténtalo de nuevo mañana.",
  genericError: "Algo salió mal. Inténtalo de nuevo.",
  fallbackError: "Algo salió mal. Inténtalo de nuevo.",
  offline: "No pude conectarme con el servidor. Revisa tu conexión e inténtalo de nuevo.",
  you: "Tú",
  assistant: "Asistente",
};

export const assistant = defineDictionary(en, es);
