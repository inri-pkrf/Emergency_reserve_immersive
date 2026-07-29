import { useState } from "react";
import { X, Search, Keyboard } from "lucide-react";
import { tagColor } from "@/lib/tagColors";
import TouchKeyboard from "@/components/media/TouchKeyboard";

export default function FilterPanel({ options, filters, setFilters }) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const toggle = (key, value) => setFilters((current) => ({ ...current, [key]: current[key] === value ? "" : value }));
  const hasFilters = filters.category || filters.type || filters.tag || filters.search;
  const btnClass = (active) => active ?
  "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20" :
  "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700";

  return (
    <div className="h-full overflow-y-auto p-8" dir="rtl">
      <div className="mx-auto w-[90%]">
        <div className="relative mb-8">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-400" />
          <button
            onClick={() => setShowKeyboard(true)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-14 text-right text-2xl outline-none transition hover:border-amber-400 dark:border-white/10 dark:bg-slate-900">
            
            {filters.search || <span className="text-slate-400">חיפוש חופשי...</span>}
          </button>
          <Keyboard className="pointer-events-none absolute left-4 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-400" />
          {filters.search &&
          <button onClick={() => setFilters((c) => ({ ...c, search: "" }))} className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-7 w-7" />
            </button>
          }
        </div>

        {options.categories.length > 0 &&
        <section className="mb-8">
            <h3 className="mb-4 text-3xl font-bold text-slate-500 dark:text-slate-400">מקור / קטגוריה</h3>
            <div className="flex flex-wrap gap-2">
              {options.categories.map((cat) =>
            <button key={cat} onClick={() => toggle("category", cat)} className={`rounded-xl px-5 py-3 text-lg font-bold transition ${btnClass(filters.category === cat)}`}>{cat}</button>
            )}
            </div>
          </section>
        }

        {options.types.length > 0 &&
        <section className="mb-8">
            <h3 className="mb-4 text-3xl font-bold text-slate-500 dark:text-slate-400">סוג קובץ</h3>
            <div className="flex flex-wrap gap-2">
              {options.types.map((type) =>
            <button key={type} onClick={() => toggle("type", type)} className={`rounded-xl px-5 py-3 text-lg font-bold transition ${btnClass(filters.type === type)}`}>{type}</button>
            )}
            </div>
          </section>
        }

        {options.tags.length > 0 &&
        <section className="mb-8">
            <h3 className="mb-4 text-3xl font-bold text-slate-500 dark:text-slate-400">תגיות</h3>
            <div className="flex flex-wrap gap-2">
              {options.tags.map((tag) =>
            <button key={tag} onClick={() => toggle("tag", tag)} className={`rounded-full px-4 py-2 font-bold transition text-xl ${tagColor(tag)} ${filters.tag === tag ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950" : "opacity-60 hover:opacity-100"}`}>{tag}</button>
            )}
            </div>
          </section>
        }

        {hasFilters &&
        <button onClick={() => setFilters({ category: "", type: "", tag: "", date: "", search: "" })} className="flex items-center gap-1.5 rounded-full bg-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20">
            <X className="h-4 w-4" /> ניקוי מסננים
          </button>
        }
      </div>

      {showKeyboard &&
      <div className="mx-auto w-[60%]">
          <TouchKeyboard
          value={filters.search}
          onChange={(val) => setFilters((c) => ({ ...c, search: val }))}
          onClose={() => setShowKeyboard(false)} />
        
        </div>
      }
    </div>);

}