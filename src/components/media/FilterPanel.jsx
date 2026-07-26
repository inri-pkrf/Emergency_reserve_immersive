import { X, Search } from "lucide-react";
import { tagColor } from "@/lib/tagColors";

export default function FilterPanel({ options, filters, setFilters }) {
  const toggle = (key, value) => setFilters((current) => ({ ...current, [key]: current[key] === value ? "" : value }));
  const hasFilters = filters.category || filters.type || filters.tag || filters.search;
  const btnClass = (active) => active
    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700";

  return (
    <div className="h-full overflow-y-auto p-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-8">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value }))}
            placeholder="חיפוש חופשי..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-14 text-2xl outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 dark:border-white/10 dark:bg-slate-900"
          />
          {filters.search && (
            <button onClick={() => setFilters((c) => ({ ...c, search: "" }))} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-7 w-7" />
            </button>
          )}
        </div>

        {options.categories.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-4 text-2xl font-bold text-slate-500 dark:text-slate-400">מקור / קטגוריה</h3>
            <div className="flex flex-wrap gap-2">
              {options.categories.map((cat) => (
                <button key={cat} onClick={() => toggle("category", cat)} className={`rounded-xl px-5 py-3 text-lg font-bold transition ${btnClass(filters.category === cat)}`}>{cat}</button>
              ))}
            </div>
          </section>
        )}

        {options.types.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-4 text-2xl font-bold text-slate-500 dark:text-slate-400">סוג קובץ</h3>
            <div className="flex flex-wrap gap-2">
              {options.types.map((type) => (
                <button key={type} onClick={() => toggle("type", type)} className={`rounded-xl px-5 py-3 text-lg font-bold transition ${btnClass(filters.type === type)}`}>{type}</button>
              ))}
            </div>
          </section>
        )}

        {options.tags.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-4 text-2xl font-bold text-slate-500 dark:text-slate-400">תגיות</h3>
            <div className="flex flex-wrap gap-2">
              {options.tags.map((tag) => (
                <button key={tag} onClick={() => toggle("tag", tag)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${tagColor(tag)} ${filters.tag === tag ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950" : "opacity-60 hover:opacity-100"}`}>{tag}</button>
              ))}
            </div>
          </section>
        )}

        {hasFilters && (
          <button onClick={() => setFilters({ category: "", type: "", tag: "", date: "", search: "" })} className="flex items-center gap-1.5 rounded-full bg-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-300 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20">
            <X className="h-4 w-4" /> ניקוי מסננים
          </button>
        )}
      </div>
    </div>
  );
}