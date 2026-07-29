import { useState } from "react";
import { X, Delete, Globe } from "lucide-react";

const KEYS_HE = [
  ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך"],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
];

const KEYS_EN = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export default function TouchKeyboard({ value, onChange, onClose }) {
  const [lang, setLang] = useState("he");

  const handleKey = (key) => onChange(value + key);
  const handleBackspace = () => onChange(value.slice(0, -1));
  const handleSpace = () => onChange(value + " ");

  const keys = lang === "he" ? KEYS_HE : KEYS_EN;
  const keyClass =
    "flex items-center justify-center rounded-xl bg-white text-xl font-bold text-slate-900 shadow-sm transition hover:bg-amber-50 active:scale-95 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600";

  return (
    <div className="mx-auto mt-4 w-[75%] rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-xl dark:border-white/10 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-2.5 text-lg font-bold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          <Globe className="h-5 w-5" />
          {lang === "he" ? "עברית" : "EN"}
        </button>
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-lg font-bold text-slate-950 transition hover:bg-amber-300"
        >
          <X className="h-5 w-5" />
          סגירה
        </button>
      </div>

      <div className="flex flex-col gap-2.5" dir={lang === "he" ? "rtl" : "ltr"}>
        {keys.map((row, i) => (
          <div key={i} className="flex justify-center gap-2">
            {row.map((k) => (
              <button key={k} onClick={() => handleKey(k)} className={`h-12 min-w-[2.5rem] flex-1 ${keyClass}`}>
                {k}
              </button>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-2">
          <button onClick={handleBackspace} className={`flex items-center gap-2 ${keyClass} h-12 px-5`}>
            <Delete className="h-5 w-5" />
          </button>
          <button onClick={handleSpace} className={`h-12 flex-1 ${keyClass}`}>
            רווח
          </button>
        </div>
      </div>
    </div>
  );
}