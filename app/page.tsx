import Link from "next/link";
import { getManifest } from "@/lib/manifest";
import { getProviderColor } from "@/lib/colors";

export default function HomePage() {
  const { providers } = getManifest();

  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">Πάροχοι Ενέργειας</h1>
        <p className="text-slate-400 text-sm">Επιλέξτε πάροχο για να δείτε τα διαθέσιμα συμβόλαια</p>
      </div>

      {/* Provider grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => {
          const color = getProviderColor(provider.slug);
          const totalFiles = provider.energyTypes.reduce((acc, e) => {
            return acc + e.sharedFiles.length + e.customerTypes.reduce((a, c) => {
              return a + c.sharedFiles.length + c.programs.reduce((p, pr) => p + pr.files.length, 0);
            }, 0);
          }, 0);

          return (
            <Link
              key={provider.slug}
              href={`/${provider.slug}/`}
              className={`group relative p-5 rounded-2xl border ${color.border} ${color.bg} hover:scale-[1.02] transition-all duration-200 hover:shadow-xl`}
            >
              {/* Provider initial badge */}
              <div className={`w-12 h-12 rounded-xl border ${color.border} bg-slate-900/60 flex items-center justify-center mb-4`}>
                <span className={`text-lg font-bold ${color.text}`}>
                  {provider.label[0]}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white mb-1">{provider.label}</h2>
              <p className="text-sm text-slate-400">
                {provider.energyTypes.length} {provider.energyTypes.length === 1 ? "τύπος" : "τύποι"} ενέργειας
                <span className="mx-1.5 text-slate-600">·</span>
                {totalFiles} αρχεία
              </p>

              {/* Energy type pills */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {provider.energyTypes.map((e) => (
                  <span key={e.slug} className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
                    {e.label}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <svg className={`absolute right-4 top-4 w-4 h-4 ${color.text} opacity-40 group-hover:opacity-100 transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
