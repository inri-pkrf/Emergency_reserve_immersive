import MediaCard from "@/components/media/MediaCard";

export default function Gallery({ items, onOpen, syncError }) {
  return (
    <div className="h-full overflow-y-auto px-4 py-4" dir="rtl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-950 dark:text-white">{items.length} פריטים</h2>
      </div>
      {syncError && (
        <div className="mb-4 rounded-2xl border border-amber-300/50 bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
          לא ניתן היה לגשת לגיליון. ודאו שהגיליון פתוח לצפייה ציבורית.
        </div>
      )}
      {items.length ? (
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => <MediaCard key={item.id} item={item} onOpen={onOpen} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500 dark:border-white/15">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">אין פריטים להצגה</p>
          <p className="mt-1 text-xs">שנו את המסננים.</p>
        </div>
      )}
    </div>
  );
}