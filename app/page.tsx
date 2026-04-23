import Link from "next/link";
import { PROVIDER_COLORS } from "@/lib/colors";

const ROOT_CATEGORIES = [
  {
    name: "Ενέργεια",
    description: "Συμβόλαια και αιτήσεις για παρόχους ηλεκτρισμού και φυσικού αερίου.",
    icon: "⚡",
    colorKey: "ενέργεια",
  },
  {
    name: "Τηλεφωνία",
    description: "Συμβόλαια και αιτήσεις για παρόχους τηλεφωνίας.",
    icon: "📞",
    colorKey: "τηλεφωνία",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Πύλη Συμβολαίων
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Περιηγηθείτε και κατεβάστε αιτήσεις, γενικούς όρους και συμβόλαια προγραμμάτων για όλους τους συνεργαζόμενους παρόχους.
        </p>
      </div>

      {/* Root Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
        {ROOT_CATEGORIES.map((cat) => {
          const defaultColor = { bg: "bg-slate-800/40", text: "text-slate-300", border: "border-slate-700/50", dot: "bg-slate-400" };
          const theme = PROVIDER_COLORS[cat.colorKey] || defaultColor;

          return (
            <Link
              key={cat.name}
              href={`/folder/${cat.name}`}
              className={`group relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl ${theme.bg} ${theme.border}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-black/20`}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold text-white group-hover:text-[color:var(--hover-text)] transition-colors`}
                    style={{ "--hover-text": "oklch(80% 0.15 80)" } as React.CSSProperties}
                  >
                    {cat.name}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{cat.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
