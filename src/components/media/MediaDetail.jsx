import { useState } from "react";
import { ArrowRight, Pencil, Save } from "lucide-react";
import { mediaUrl, thumbnailUrl } from "@/lib/mediaParser";

export default function MediaDetail({ item, onBack, onSave, isAdmin }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.displayName);
  const [description, setDescription] = useState(item.description || "");
  const save = () => { onSave(item.id, { displayName: name.trim() || item.originalName, description }); setEditing(false); };

  return (
    <div className="h-full overflow-y-auto p-6" dir="rtl">
      <div className="mx-auto w-[90%]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <button onClick={onBack} className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 text-xl font-bold transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:hover:bg-white/10">
            <ArrowRight className="h-7 w-7" /> חזור לעמוד מיון
          </button>
          {isAdmin && (
            <button onClick={editing ? save : () => setEditing(true)} className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-base font-bold text-slate-950">
              {editing ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
              {editing ? "שמירה" : "עריכה"}
            </button>
          )}
        </div>
        {editing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} className="mb-5 w-full rounded-2xl border border-amber-400 bg-white p-4 text-3xl font-black outline-none dark:bg-slate-900" />
        ) : (
          <h1 className="mb-5 text-4xl font-black text-slate-950 dark:text-white sm:text-5xl">{item.displayName}</h1>
        )}
        <div className="overflow-hidden rounded-3xl bg-black shadow-2xl">
          {item.type === "תמונה" ? (
            <img src={thumbnailUrl(item, "w2000")} alt={item.displayName} className="mx-auto max-h-[55vh] w-full object-contain" />
          ) : (
            <iframe src={mediaUrl(item)} title={item.displayName} allow="autoplay; encrypted-media" allowFullScreen className="aspect-video w-full" />
          )}
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-7">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-400">תיאור המקרה</p>
            {item.manualDate && <span className="shrink-0 rounded-full bg-amber-500 px-4 py-1.5 text-sm font-bold text-white">{item.manualDate}</span>}
          </div>
          {editing ? (
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="כתבו כאן את סיפור המקרה..." className="w-full rounded-xl border border-amber-400 bg-transparent p-4 text-lg leading-8 outline-none" />
          ) : (
            <p className="whitespace-pre-wrap text-lg leading-9 text-slate-600 dark:text-slate-300">{item.description || "טרם נוסף תיאור לפריט זה."}</p>
          )}
        </div>
      </div>
    </div>
  );
}