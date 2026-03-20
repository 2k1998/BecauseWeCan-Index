import Link from "next/link";
import { getFolderContent } from "@/lib/manifest";
import { PROVIDER_COLORS } from "@/lib/colors";
import { FolderCard } from "@/components/FolderCard";

export default function HomePage() {
  const rootFolders = getFolderContent("");

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Πύλη Ενεργειακών Συμβολαίων
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Περιηγηθείτε και κατεβάστε αιτήσεις, γενικούς όρους και συμβόλαια προγραμμάτων για όλους τους συνεργαζόμενους παρόχους ενέργειας.
        </p>
      </div>

      {/* Providers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rootFolders.map((folder) => {
          const defaultColor = { bg: "bg-slate-800/40", text: "text-slate-300", border: "border-slate-700/50", dot: "bg-slate-400" };
          
          const slugMap: Record<string, string> = {
            "ζενίθ": "zenith",
            "ήρων": "iron",
            "δεη": "dei"
          };
          const colorSlug = slugMap[folder.name.toLowerCase()] || folder.name.toLowerCase();
          const theme = PROVIDER_COLORS[colorSlug] || defaultColor;

          return (
            <Link
              key={folder.name}
              href={`/folder/${encodeURIComponent(folder.name)}`}
              className={`group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl ${theme.bg} ${theme.border} hover:border-[color:var(--hover-border)]`}
              style={{ "--hover-border": theme.border.replace("border-", "").split("/")[0] } as React.CSSProperties}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl uppercase ${theme.text} bg-black/20`}>
                  {folder.name.substring(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-[#c99b3b] transition-colors">{folder.name}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
