import { notFound } from "next/navigation";
import { getManifest, getProvider } from "@/lib/manifest";
import { getProviderColor } from "@/lib/colors";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FolderCard } from "@/components/FolderCard";

export const dynamicParams = false;

export function generateStaticParams() {
  const { providers } = getManifest();
  return providers.map((p) => ({ provider: p.slug }));
}

export default async function ProviderPage({ params }: { params: Promise<{ provider: string }> }) {
  const { provider: providerSlug } = await params;
  const provider = getProvider(providerSlug);
  if (!provider) notFound();

  const color = getProviderColor(providerSlug);

  return (
    <div>
      <Breadcrumbs crumbs={[{ label: provider.label }]} />

      <div className="mt-6 mb-8 flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl border ${color.border} ${color.bg} flex items-center justify-center`}>
          <span className={`text-2xl font-bold ${color.text}`}>{provider.label[0]}</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{provider.label}</h1>
          <p className="text-sm text-slate-400">Επιλέξτε τύπο ενέργειας</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-lg">
        {provider.energyTypes.map((e) => {
          const totalFiles = e.sharedFiles.length + e.customerTypes.reduce((acc, c) =>
            acc + c.sharedFiles.length + c.programs.reduce((a, p) => a + p.files.length, 0), 0);

          const icon = e.slug === "revma" ? (
            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          );

          return (
            <FolderCard
              key={e.slug}
              label={e.label}
              href={`/${providerSlug}/${e.slug}/`}
              count={totalFiles}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
}
