import { notFound } from "next/navigation";
import { getManifest, getCustomerType, getEnergyType, getProvider } from "@/lib/manifest";
import { getProgramDot } from "@/lib/colors";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FolderCard } from "@/components/FolderCard";
import { FileList } from "@/components/FileList";

export const dynamicParams = false;

export function generateStaticParams() {
  const { providers } = getManifest();
  return providers.flatMap((p) =>
    p.energyTypes.flatMap((e) =>
      e.customerTypes.map((c) => ({
        provider: p.slug,
        energy: e.slug,
        customer: c.slug,
      }))
    )
  );
}

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ provider: string; energy: string; customer: string }>;
}) {
  const { provider: providerSlug, energy: energySlug, customer: customerSlug } = await params;
  const provider = getProvider(providerSlug);
  const energy = getEnergyType(providerSlug, energySlug);
  const customer = getCustomerType(providerSlug, energySlug, customerSlug);
  if (!provider || !energy || !customer) notFound();

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: provider.label, href: `/${providerSlug}/` },
          { label: energy.label, href: `/${providerSlug}/${energySlug}/` },
          { label: customer.label },
        ]}
      />

      <div className="mt-6 mb-8">
        <h1 className="text-xl font-bold text-white">
          {provider.label} — {energy.label} — {customer.label}
        </h1>
        {customer.programs.length > 0 && (
          <p className="text-sm text-slate-400 mt-1">Επιλέξτε πρόγραμμα</p>
        )}
      </div>

      {/* Shared files at customer level */}
      {customer.sharedFiles.length > 0 && (
        <div className="mb-8">
          <FileList files={customer.sharedFiles} title="Κοινά Έγγραφα" />
        </div>
      )}

      {/* Program folders */}
      {customer.programs.length > 0 && (
        <div className="flex flex-col gap-3 max-w-lg">
          {customer.programs.map((p) => (
            <FolderCard
              key={p.slug}
              label={p.label}
              href={`/${providerSlug}/${energySlug}/${customerSlug}/${p.slug}/`}
              count={p.files.length}
              colorDot={getProgramDot(p.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
