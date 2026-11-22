// src/lib/i18n/dictionaries/tithe.ts
// Text for /tools/tithe: calculator, gross-vs-net explainer, salary guide and
// FAQ. Page metadata lives in src/app/tools/tithe/layout.tsx (server only).
//
// Strings that contain numbers are functions; callers pass values already
// formatted for the locale. The FAQ answers feed both the visible FAQ and the
// FAQPage JSON-LD.
import { defineDictionary, type Translation } from "../dictionary";

export type Frequency = "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly";

const en = {
  /** Intl locale used for currency formatting. */
  numberLocale: "en-US",
  heading: "Tithe Calculator",
  intro:
    "Enter your income, choose your pay period, and adjust the percentage to see your tithe broken down per period and across the year — on gross or net, whichever you give on.",
  frequency: {
    weekly: "Weekly",
    biweekly: "Bi-weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  },
  incomeLabel: "Income per pay period",
  incomePlaceholder: "Enter your income",
  payPeriodLabel: "Pay period",
  percentageLabel: "Tithe percentage:",
  offeringLabel: "Optional offering per pay period",
  offeringPlaceholder: "Example: 25",
  resultEyebrow: "Your estimated tithe",
  resultLine: (percentage: string, frequency: Frequency) =>
    `${percentage}% of your ${en.frequency[frequency].toLowerCase()} income.`,
  totalWithOffering: "Total with offering",
  weeklyAverage: "Weekly average",
  monthlyAverage: "Monthly average",
  yearlyProjection: "Yearly giving projection",
  yearlySplit: (tithe: string, offering: string) => `Tithe: ${tithe} · Offering: ${offering}`,
  bibleLink: "What does the Bible say about tithing? →",
  explainer: {
    heading: "Gross or net — which do I use?",
    beforeLink:
      "The Bible doesn't specify gross versus net, and sincere believers land in both places. Some give on gross (pre-tax) income as the “firstfruits” of everything they earn; others give on net (take-home) pay, the portion they actually receive. This calculator works for either — just enter the income figure you've decided to give on. For the full breakdown, including tithe vs. offering and what Scripture says, see the",
    linkText: "complete tithing guide",
    afterLink: ".",
  },
  guide: {
    stepsHeading: "How to calculate your tithe from your salary",
    steps: [
      {
        title: "Decide gross or net",
        body: "Choose whether you give on your income before taxes (gross) or your take-home pay (net). Either is a sincere choice; just be consistent.",
      },
      {
        title: "Find your income for one pay period",
        body: "Look at your pay stub for the gross or net amount of a single paycheck. If you only know your annual salary, you can use that instead.",
      },
      {
        title: "Multiply by 10%",
        body: "Multiply that amount by 0.10. For example, a $2,000 paycheck gives a $200 tithe. If you give a different percentage, multiply by that instead.",
      },
      {
        title: "Set it aside each payday",
        body: "Give the amount when you are paid, so your tithe comes first rather than from whatever is left at the end of the month.",
      },
    ],
    examplesHeading: "Tithe examples by salary",
    examplesIntro: (percent: string) =>
      `A ${percent}% tithe on common yearly salaries, rounded to the nearest cent. Bi-weekly assumes 26 paychecks a year and weekly assumes 52.`,
    columns: {
      salary: "Yearly salary",
      yearly: "Yearly tithe",
      monthly: "Monthly",
      biweekly: "Bi-weekly",
      weekly: "Weekly",
    },
    guideLinkBefore: "Wondering why Christians give a tenth at all? Our",
    guideLinkText: "guide to tithing in the Bible",
    guideLinkAfter: "walks through the key passages.",
    faqHeading: "Tithe calculator FAQ",
  },
  faq: {
    grossOrNet: {
      q: "Should I tithe on gross or net income?",
      a: "The Bible does not say. Many Christians give on gross income as the firstfruits of everything they earn, while others give on net income, the pay they actually take home. Both are sincere choices. Pick the one you can give on faithfully and consistently.",
    },
    perPaycheck: {
      q: "How much is a tithe per paycheck?",
      a: (salary: string, biweekly: string, weekly: string) =>
        `A tithe is 10% of each paycheck. Multiply the paycheck amount by 0.10: a $2,000 paycheck means a $200 tithe. On a ${salary} salary paid every two weeks, that works out to ${biweekly} per paycheck, or ${weekly} if you are paid weekly.`,
    },
    alwaysTen: {
      q: "Is a tithe always 10%?",
      a: "Yes. The word tithe means a tenth, so a tithe is 10% by definition. Some people choose to give less while they work toward a full tithe, and others give more than 10%. Any amount beyond the tithe is usually called an offering.",
    },
    titheVsOffering: {
      q: "What is the difference between a tithe and an offering?",
      a: "A tithe is a set portion, 10% of your income, usually given regularly to your local church. An offering is any gift above the tithe, given freely in whatever amount you choose, for example to a missions project or someone in need.",
    },
    monthly: {
      q: "How do I calculate a monthly tithe?",
      a: (salary: string, yearly: string, monthly: string) =>
        `Multiply your monthly income by 0.10. If you know your yearly salary instead, divide your yearly tithe by 12. For example, a ${salary} salary gives a ${yearly} yearly tithe, which is ${monthly} a month.`,
    },
  },
};

const esFrequencyAdjective: Record<Frequency, string> = {
  weekly: "semanales",
  biweekly: "de cada dos semanas",
  monthly: "mensuales",
  quarterly: "trimestrales",
  yearly: "anuales",
};

const es: Translation<typeof en> = {
  numberLocale: "es-US",
  heading: "Calculadora de diezmo",
  intro:
    "Ingresa tus ingresos, elige tu periodo de pago y ajusta el porcentaje para ver tu diezmo por periodo y a lo largo del año, ya sea sobre tus ingresos brutos o netos, según como prefieras dar.",
  frequency: {
    weekly: "Semanal",
    biweekly: "Cada 2 semanas",
    monthly: "Mensual",
    quarterly: "Trimestral",
    yearly: "Anual",
  },
  incomeLabel: "Ingresos por periodo de pago",
  incomePlaceholder: "Ingresa tus ingresos",
  payPeriodLabel: "Periodo de pago",
  percentageLabel: "Porcentaje del diezmo:",
  offeringLabel: "Ofrenda opcional por periodo de pago",
  offeringPlaceholder: "Ejemplo: 25",
  resultEyebrow: "Tu diezmo estimado",
  resultLine: (percentage: string, frequency: Frequency) =>
    `${percentage}% de tus ingresos ${esFrequencyAdjective[frequency]}.`,
  totalWithOffering: "Total con ofrenda",
  weeklyAverage: "Promedio semanal",
  monthlyAverage: "Promedio mensual",
  yearlyProjection: "Proyección anual de lo que das",
  yearlySplit: (tithe: string, offering: string) => `Diezmo: ${tithe} · Ofrenda: ${offering}`,
  bibleLink: "¿Qué dice la Biblia sobre el diezmo? (en inglés) →",
  explainer: {
    heading: "¿Ingresos brutos o netos? ¿Cuál uso?",
    beforeLink:
      "La Biblia no especifica si el diezmo se calcula sobre los ingresos brutos o los netos, y hay creyentes sinceros en ambos casos. Algunos lo dan sobre sus ingresos brutos (antes de impuestos) como las “primicias” de todo lo que ganan; otros lo dan sobre su sueldo neto, la parte que realmente reciben. Esta calculadora sirve para los dos: solo ingresa la cantidad sobre la que decidiste diezmar. Para una explicación completa, incluida la diferencia entre diezmo y ofrenda y lo que dice la Biblia, consulta la",
    linkText: "guía completa sobre el diezmo",
    afterLink: " (en inglés).",
  },
  guide: {
    stepsHeading: "Cómo calcular tu diezmo a partir de tu salario",
    steps: [
      {
        title: "Decide si usarás ingresos brutos o netos",
        body: "Elige si darás el diezmo sobre tus ingresos antes de impuestos (brutos) o sobre lo que recibes después de impuestos (netos). Las dos opciones son válidas; lo importante es ser constante.",
      },
      {
        title: "Busca tus ingresos de un periodo de pago",
        body: "Revisa tu recibo de pago para ver el monto bruto o neto de un solo pago. Si solo conoces tu salario anual, también puedes usarlo.",
      },
      {
        title: "Multiplica por 10%",
        body: "Multiplica esa cantidad por 0.10. Por ejemplo, un pago de $2,000 da un diezmo de $200. Si das otro porcentaje, multiplica por ese porcentaje.",
      },
      {
        title: "Apártalo cada día de pago",
        body: "Da el diezmo en cuanto recibas tu pago, para que tu diezmo vaya primero y no dependa de lo que sobre a fin de mes.",
      },
    ],
    examplesHeading: "Ejemplos de diezmo según el salario",
    examplesIntro: (percent: string) =>
      `Un diezmo del ${percent}% sobre salarios anuales comunes, redondeado al centavo. “Cada 2 semanas” supone 26 pagos al año y “semanal”, 52.`,
    columns: {
      salary: "Salario anual",
      yearly: "Diezmo anual",
      monthly: "Mensual",
      biweekly: "Cada 2 semanas",
      weekly: "Semanal",
    },
    guideLinkBefore: "¿Te preguntas por qué los cristianos dan la décima parte? Nuestra",
    guideLinkText: "guía sobre el diezmo en la Biblia",
    guideLinkAfter: "(en inglés) repasa los pasajes clave.",
    faqHeading: "Preguntas frecuentes sobre la calculadora de diezmo",
  },
  faq: {
    grossOrNet: {
      q: "¿Debo dar el diezmo sobre mis ingresos brutos o netos?",
      a: "La Biblia no lo especifica. Muchos cristianos diezman sobre sus ingresos brutos, como las primicias de todo lo que ganan, mientras que otros lo hacen sobre sus ingresos netos, el dinero que realmente reciben. Las dos opciones son válidas. Elige aquella con la que puedas dar con fidelidad y constancia.",
    },
    perPaycheck: {
      q: "¿Cuánto es el diezmo de cada pago?",
      a: (salary: string, biweekly: string, weekly: string) =>
        `El diezmo es el 10% de cada pago. Multiplica el monto de tu pago por 0.10: un pago de $2,000 significa un diezmo de $200. Con un salario de ${salary} que se paga cada dos semanas, son ${biweekly} por pago, o ${weekly} si te pagan cada semana.`,
    },
    alwaysTen: {
      q: "¿El diezmo siempre es el 10%?",
      a: "Sí. La palabra diezmo significa la décima parte, así que el diezmo es, por definición, el 10%. Algunas personas dan menos mientras avanzan hacia un diezmo completo, y otras dan más del 10%. Lo que se da por encima del diezmo suele llamarse ofrenda.",
    },
    titheVsOffering: {
      q: "¿Cuál es la diferencia entre el diezmo y la ofrenda?",
      a: "El diezmo es una porción fija, el 10% de tus ingresos, que por lo general se da con regularidad a tu iglesia local. La ofrenda es cualquier donativo además del diezmo, que se da libremente y en la cantidad que tú decidas, por ejemplo para un proyecto misionero o para alguien en necesidad.",
    },
    monthly: {
      q: "¿Cómo calculo mi diezmo mensual?",
      a: (salary: string, yearly: string, monthly: string) =>
        `Multiplica tus ingresos mensuales por 0.10. Si en cambio conoces tu salario anual, divide tu diezmo anual entre 12. Por ejemplo, un salario de ${salary} da un diezmo anual de ${yearly}, es decir, ${monthly} al mes.`,
    },
  },
};

export const tithe = defineDictionary(en, es);
export type TitheText = typeof en;
