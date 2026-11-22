// src/lib/i18n/dictionaries/footer.ts
// Site footer text (server component).
import { defineDictionary, type Translation } from "../dictionary";

const en = {
  tagline: "Daily verses • prayers • devotionals",
  blurb:
    "A calm, Scripture-grounded companion for daily encouragement, reflection, and spiritual growth.",
  quizCta: "Take the Quiz",
  quizTip: "Tip: Share your quiz score to invite friends to beat it.",
  sitemapHeading: "Sitemap",
  toolsHeading: "Tools",
  helpHeading: "Help & Legal",
  ecosystemHeading: "Free Christian AI Tools",
  email: "Email",
  ecosystemNote:
    "Part of the Faith Companion AI ecosystem — free tools for prayer, Bible study, and tithing.",
  rights: "All rights reserved.",
  bottomLine: "Scripture-based support for daily encouragement and growth.",
  links: {
    home: "Home",
    dashboard: "Dashboard",
    tools: "Tools",
    prayerLibrary: "Prayer Library",
    resources: "Resources",
    quiz: "Quiz",
    verse: "Verse",
    prayer: "Prayer",
    devotional: "Devotional",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    titheCalculator: "Tithe Calculator",
    prayerGenerator: "Prayer Generator",
    verseGenerator: "Bible Verse Generator",
  },
};

const es: Translation<typeof en> = {
  tagline: "Versículos diarios • oraciones • devocionales",
  blurb:
    "Un compañero sereno y basado en las Escrituras para recibir ánimo cada día, reflexionar y crecer espiritualmente.",
  quizCta: "Juega la trivia bíblica",
  quizTip: "Consejo: comparte tu puntaje de la trivia e invita a tus amigos a superarlo.",
  sitemapHeading: "Mapa del sitio",
  toolsHeading: "Herramientas",
  helpHeading: "Ayuda y aspectos legales",
  ecosystemHeading: "Herramientas cristianas gratis con IA",
  email: "Correo electrónico",
  ecosystemNote:
    "Parte del ecosistema Faith Companion AI: herramientas gratuitas para la oración, el estudio bíblico y el diezmo.",
  rights: "Todos los derechos reservados.",
  bottomLine: "Apoyo basado en las Escrituras para recibir ánimo y crecer cada día.",
  links: {
    home: "Inicio",
    dashboard: "Mi panel",
    tools: "Herramientas",
    prayerLibrary: "Biblioteca de oraciones",
    resources: "Recursos",
    quiz: "Trivia bíblica",
    verse: "Versículo",
    prayer: "Oración",
    devotional: "Devocional",
    about: "Acerca de",
    faq: "Preguntas frecuentes",
    contact: "Contacto",
    privacy: "Privacidad",
    terms: "Términos",
    titheCalculator: "Calculadora de diezmo",
    prayerGenerator: "Generador de oraciones",
    verseGenerator: "Generador de versículos bíblicos",
  },
};

export const footer = defineDictionary(en, es);
