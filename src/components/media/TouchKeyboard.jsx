import { useState } from "react";
import { X, Delete, Globe, Hash } from "lucide-react";

const KEYS_HE = [
  ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
];

const KEYS_EN = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const KEYS_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const KEYS_SYMBOLS = [
  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
  ["-", "_", "=", "+", "[", "]", "{", "}", "|", "\\"],
  [";", ":", "'", "\"", "<", ">", ",", ".", "?", "/"],
];

const MODES = ["he", "en", "sym"];

export default function TouchKeyboard({ value, onChange, onClose }) {
  const [mode, setMode] = useState("he");

  const handleKey = (key) => onChange(value + key);
  const handleBackspace = () => onChange(value.slice(0, -1));
  const handleSpace = () => onChange(value + " ");
  const cycleMode = () => setMode(MODES[(MODES.indexOf(mode) + 1) % MODES.length]);

  const letterKeys = mode === "he" ? KEYS_HE : mode === "en" ? KEYS_EN : KEYS_SYMBOLS;
  const modeLabel = mode === "he" ? "עברית" : mode === "en" ? "EN" : "סמלים";
  const keyClass = "flex items-center justify-center rounded-xl bg-white text-2xl font-bold text-slate-900 shadow-sm transition hover:bg-amber-50 active:scale-95 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600";

  return (
    <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-slate-100 p-5 shadow-xl dark:border-white/10 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={cycleMode}
          className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-2.5 text-lg font-bold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          {mode === "sym" ? <Hash className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
          {modeLabel}
        </button>
        <button
          onClick={onClose}
          className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-lg font-bold text-slate-950 transition hover:bg-amber-300"
        >
          <X className="h-5 w-5" />
          סגירה
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex justify-center gap-2">
          {KEYS_NUMBERS.map((k) => (
            <button key={k} onClick={() => handleKey(k)} className={`h-14 min-w-[3rem] flex-1 ${keyClass}`}>
              {k}
            </button>
          ))}
        </div>
        {letterKeys.map((row, i) => (
          <div key={i} className={`flex justify-center gap-2 ${mode === "he" ? "flex-row-reverse" : ""}`}>
            {row.map((k) => (
              <button key={k} onClick={() => handleKey(k)} className={`h-14 min-w-[3rem] flex-1 ${keyClass}`}>
                {k}
              </button>
            ))}
          </div>
        ))}
        <div className="flex flex-row-reverse justify-center gap-2">
          <button onClick={handleBackspace} className={`flex items-center gap-2 ${keyClass} h-14 px-5`}>
            <Delete className="h-5 w-5" />
          </button>
          <button onClick={handleSpace} className={`h-14 flex-1 ${keyClass}`}>
            רווח
          </button>
        </div>
      </div>
    </div>
  );
}