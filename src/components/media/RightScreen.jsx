const LOGO_LIGHT = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/d7a412404_collegeLogoText.png";
const LOGO_DARK = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/015a95113_whiteLogo.png";

export default function RightScreen({ theme }) {
  return (
    <div className="flex flex-col items-center gap-6 px-8" dir="rtl">
      <img src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT} alt="המכללה הלאומית לאיתנות ישראלית" className="h-auto w-48 rounded-2xl sm:w-64" />
      <h1 className="text-center text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-6xl">מאגרי חירום</h1>
    </div>
  );
}