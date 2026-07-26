import MediaCard from "@/components/media/MediaCard";

export default function SimilarPanel({ items, onOpen }) {
  return (
    <div className="h-full overflow-y-auto px-4 py-4" dir="rtl">
      <h2 className="mb-4 text-3xl font-black text-slate-950 dark:text-white">קבצים דומים</h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {items.slice(0, 12).map((sim) => (
            <MediaCard key={sim.id} item={sim} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500 dark:border-white/15">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">אין קבצים דומים</p>
        </div>
      )}
    </div>
  );
}