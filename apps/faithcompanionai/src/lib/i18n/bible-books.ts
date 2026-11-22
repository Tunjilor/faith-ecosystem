// src/lib/i18n/bible-books.ts
// The 66 books of the Protestant canon with their English names and the
// Reina-Valera 1909 (RV1909) Spanish names, as bible-api.com returns them in
// `book_name` for translation=rv1909. `id` is the USFM code bible-api.com
// accepts in place of a name (e.g. "PSA 23:1"), which avoids name-matching
// problems such as "Psalm" vs "Psalms".
//
// `aliases` are other spellings people (and models) write for the same book:
// singular forms, missing accents, "San Juan", abbreviations-free variants.
// They are only used to recognize references; output always uses `es` / `en`.

export type BibleBook = {
  id: string;
  en: string;
  es: string;
  aliases?: string[];
};

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { id: "GEN", en: "Genesis", es: "Génesis", aliases: ["Genesis"] },
  { id: "EXO", en: "Exodus", es: "Éxodo", aliases: ["Exodo"] },
  { id: "LEV", en: "Leviticus", es: "Levítico", aliases: ["Levitico"] },
  { id: "NUM", en: "Numbers", es: "Números", aliases: ["Numeros"] },
  { id: "DEU", en: "Deuteronomy", es: "Deuteronomio" },
  { id: "JOS", en: "Joshua", es: "Josué", aliases: ["Josue"] },
  { id: "JDG", en: "Judges", es: "Jueces" },
  { id: "RUT", en: "Ruth", es: "Rut" },
  { id: "1SA", en: "1 Samuel", es: "1 Samuel" },
  { id: "2SA", en: "2 Samuel", es: "2 Samuel" },
  { id: "1KI", en: "1 Kings", es: "1 Reyes" },
  { id: "2KI", en: "2 Kings", es: "2 Reyes" },
  { id: "1CH", en: "1 Chronicles", es: "1 Crónicas", aliases: ["1 Cronicas"] },
  { id: "2CH", en: "2 Chronicles", es: "2 Crónicas", aliases: ["2 Cronicas"] },
  { id: "EZR", en: "Ezra", es: "Esdras" },
  { id: "NEH", en: "Nehemiah", es: "Nehemías", aliases: ["Nehemias"] },
  { id: "EST", en: "Esther", es: "Ester" },
  { id: "JOB", en: "Job", es: "Job" },
  { id: "PSA", en: "Psalms", es: "Salmos", aliases: ["Psalm", "Salmo"] },
  { id: "PRO", en: "Proverbs", es: "Proverbios" },
  { id: "ECC", en: "Ecclesiastes", es: "Eclesiastés", aliases: ["Eclesiastes"] },
  { id: "SNG", en: "Song of Solomon", es: "Cantares", aliases: ["Song of Songs", "Cantar de los Cantares"] },
  { id: "ISA", en: "Isaiah", es: "Isaías", aliases: ["Isaias"] },
  { id: "JER", en: "Jeremiah", es: "Jeremías", aliases: ["Jeremias"] },
  { id: "LAM", en: "Lamentations", es: "Lamentaciones" },
  { id: "EZK", en: "Ezekiel", es: "Ezequiel" },
  { id: "DAN", en: "Daniel", es: "Daniel" },
  { id: "HOS", en: "Hosea", es: "Oseas" },
  { id: "JOL", en: "Joel", es: "Joel" },
  { id: "AMO", en: "Amos", es: "Amós", aliases: ["Amos"] },
  { id: "OBA", en: "Obadiah", es: "Abdías", aliases: ["Abdias"] },
  { id: "JON", en: "Jonah", es: "Jonás", aliases: ["Jonas"] },
  { id: "MIC", en: "Micah", es: "Miqueas" },
  { id: "NAM", en: "Nahum", es: "Nahúm", aliases: ["Nahum"] },
  { id: "HAB", en: "Habakkuk", es: "Habacuc" },
  { id: "ZEP", en: "Zephaniah", es: "Sofonías", aliases: ["Sofonias"] },
  { id: "HAG", en: "Haggai", es: "Hageo" },
  { id: "ZEC", en: "Zechariah", es: "Zacarías", aliases: ["Zacarias"] },
  { id: "MAL", en: "Malachi", es: "Malaquías", aliases: ["Malaquias"] },
  // New Testament
  { id: "MAT", en: "Matthew", es: "Mateo", aliases: ["San Mateo"] },
  { id: "MRK", en: "Mark", es: "Marcos", aliases: ["San Marcos"] },
  { id: "LUK", en: "Luke", es: "Lucas", aliases: ["San Lucas"] },
  { id: "JHN", en: "John", es: "Juan", aliases: ["San Juan"] },
  { id: "ACT", en: "Acts", es: "Hechos", aliases: ["Hechos de los Apóstoles", "Hechos de los Apostoles"] },
  { id: "ROM", en: "Romans", es: "Romanos" },
  { id: "1CO", en: "1 Corinthians", es: "1 Corintios" },
  { id: "2CO", en: "2 Corinthians", es: "2 Corintios" },
  { id: "GAL", en: "Galatians", es: "Gálatas", aliases: ["Galatas"] },
  { id: "EPH", en: "Ephesians", es: "Efesios" },
  { id: "PHP", en: "Philippians", es: "Filipenses" },
  { id: "COL", en: "Colossians", es: "Colosenses" },
  { id: "1TH", en: "1 Thessalonians", es: "1 Tesalonicenses" },
  { id: "2TH", en: "2 Thessalonians", es: "2 Tesalonicenses" },
  { id: "1TI", en: "1 Timothy", es: "1 Timoteo" },
  { id: "2TI", en: "2 Timothy", es: "2 Timoteo" },
  { id: "TIT", en: "Titus", es: "Tito" },
  { id: "PHM", en: "Philemon", es: "Filemón", aliases: ["Filemon"] },
  { id: "HEB", en: "Hebrews", es: "Hebreos" },
  { id: "JAS", en: "James", es: "Santiago" },
  { id: "1PE", en: "1 Peter", es: "1 Pedro" },
  { id: "2PE", en: "2 Peter", es: "2 Pedro" },
  { id: "1JN", en: "1 John", es: "1 Juan", aliases: ["1 San Juan"] },
  { id: "2JN", en: "2 John", es: "2 Juan", aliases: ["2 San Juan"] },
  { id: "3JN", en: "3 John", es: "3 Juan", aliases: ["3 San Juan"] },
  { id: "JUD", en: "Jude", es: "Judas" },
  { id: "REV", en: "Revelation", es: "Apocalipsis", aliases: ["Revelations"] },
];
