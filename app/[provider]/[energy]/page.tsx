import { notFound } from "next/navigation";
import { getManifest, getEnergyType, getProvider } from "@/lib/manifest";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FolderCard } from "@/components/FolderCard";
import { FileList } from "@/components/FileList";

export const dynamicParams = false;

export function generateStaticParams() {
  const { providers } = getManifest();
  return providers.flatMap((p) =>
    p.energyTypes.map((e) => ({ provider: p.slug, energy: e.slug }))
  );
}

export default async function EnergyPage({
  params,
}: {
  params: Promise<{ provider: string; energy: string }>;
}) {
  const { provider: providerSlug, energy: energySlug } = await params;
  const provider = getProvider(providerSlug);
  const energy = getEnergyType(providerSlug, energySlug);
  if (!provider || !energy) notFound();

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: provider.label, href: `/${providerSlug}/` },
          { label: energy.label },
        ]}
      />

      <div className="mt-6 mb-8">
        <h1 className="text-xl font-bold text-white">{provider.label} — {energy.label}</h1>
        <p className="text-sm text-slate-400 mt-1">Επιλέξτε τύπο πελάτη</p>
      </div>

      {/* Shared files at energy level */}
      {energy.sharedFiles.length > 0 && (
        <div className="mb-8">
          <FileList files={energy.sharedFiles} title="Κοινά Έγγραφα" />
        </div>
      )}

      {/* Customer type folders */}
      <div className="flex flex-col gap-3 max-w-lg">
        {energy.customerTypes.map((c) => {
          const count = c.sharedFiles.length + c.programs.reduce((a, p) => a + p.files.length, 0);
          return (
            <FolderCard
              key={c.slug}
              label={c.label}
              href={`/${providerSlug}/${energySlug}/${c.slug}/`}
              count={count}
            />
          );
        })}
      </div>
    </div>
  );
}
