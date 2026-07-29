import { useState } from "react";
import { ArrowRight, Pencil, Save, Maximize2, Minimize2 } from "lucide-react";
import { mediaUrl, thumbnailUrl } from "@/lib/mediaParser";
import { tagColor } from "@/lib/tagColors";

export default function MediaDetail({ item, onBack, onSave, isAdmin }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.displayName);
  const [description, setDescription] = useState(item.description || "");
  const [zoomed, setZoomed] = useState(false);
  const save = () => {onSave(item.id, { displayName: name.trim() || item.originalName, description });setEditing(false);};

  return (
    <div className="relative h-full overflow-hidden p-6" dir="rtl">
      <div className="mx-auto flex h-full w-[90%] flex-col">
        <div className="mb-5 flex items-center justify-between gap-4">
          <button onClick={onBack} className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 font-bold transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:hover:bg-white/10 text-xl">
            <ArrowRight className="h-7 w-7" /> חזור לעמוד מיון
          </button>
          {isAdmin &&
          <button onClick={editing ? save : () => setEditing(true)} className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-base font-bold text-slate-950">
            {editing ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
            {editing ? "שמירה" : "עריכה"}
          </button>
          }
        </div>
        <div className="mb-3 flex items-center justify-between gap-4 flex-wrap">
          {editing ?
          <input value={name} onChange={(e) => setName(e.target.value)} className="min-w-[40%] flex-1 rounded-2xl border border-amber-400 bg-white p-4 text-3xl font-black outline-none dark:bg-slate-900" /> :
          <h1 className="text-4xl font-black text-slate-950 dark:text-white sm:text-5xl">{item.displayName}</h1>
          }
          <div className="flex flex-wrap gap-2.5 justify-end">
            {item.category && <span className={`rounded-full px-4 py-2 text-sm font-bold ${tagColor(item.category)}`}>{item.category}</span>}
            {item.type && <span className={`rounded-full px-4 py-2 text-sm font-bold ${tagColor(item.type)}`}>{item.type}</span>}
            {item.tags.map((tag) => <span key={tag} className={`rounded-full px-4 py-2 text-sm font-bold ${tagColor(tag)}`}>{tag}</span>)}
            {item.manualDate && <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-white">{item.manualDate}</span>}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl flex-shrink-0">
          <button onClick={() => setZoomed(true)} className="absolute top-3 right-3 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20">
            <Maximize2 className="h-6 w-6" />
          </button>
          {item.type === "תמונה" ?
          <img src={thumbnailUrl(item, "w2000")} alt={item.displayName} className="mx-auto max-h-[30vh] w-full object-contain" /> :

          <iframe src={mediaUrl(item)} title={item.displayName} allow="autoplay; encrypted-media" allowFullScreen className="aspect-video w-full" />
          }
        </div>
        <div className="mt-3 flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-7">
          <p className="mb-3 text-sm font-bold text-slate-400">תיאור המקרה</p>
          {editing ?
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="כתבו כאן את סיפור המקרה..." className="w-full rounded-xl border border-amber-400 bg-transparent p-4 text-lg leading-8 outline-none" /> :

          <p className="whitespace-pre-wrap text-lg leading-9 text-slate-600 dark:text-slate-300">{item.description || "טרם נוסף תיאור לפריט זה."}</p>
          }
        </div>
      </div>
      {zoomed &&
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black p-4">
        <button onClick={() => setZoomed(false)} className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">
          <Minimize2 className="h-8 w-8" />
        </button>
        {item.type === "תמונה" ?
        <img src={thumbnailUrl(item, "w2000")} alt={item.displayName} className="max-h-full max-w-full object-contain" /> :

        <iframe src={mediaUrl(item)} title={item.displayName} allow="autoplay; encrypted-media" allowFullScreen className="h-full w-full" />
        }
      </div>
      }
    </div>);

}