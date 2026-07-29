import IntroAnimation from "@/components/media/IntroAnimation";

export default function RightScreen({ categories = [] }) {
  return (
    <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden px-10" dir="rtl">
      <IntroAnimation categories={categories} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1 className="text-center text-7xl font-black leading-tight text-slate-950 dark:text-white sm:text-8xl">מאגרי חירום</h1>
        <p className="w-[80%] text-center text-xl leading-relaxed text-slate-600 dark:text-slate-300 sm:text-2xl">ארכיון דיגיטלי דינמי המרכז תיעוד מלחמות, מבצעים ופעילויות פיקוד העורף.<br />מנוע סינון חכם מבוסס תגיות המאפשר ניווט מהיר ואיתור תכנים דומים ומשלימים.</p>
      </div>
    </div>
  );
}