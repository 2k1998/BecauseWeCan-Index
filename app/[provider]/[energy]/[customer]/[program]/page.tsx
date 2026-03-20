import { notFound } from "next/navigation";
import { getManifest, getProgram, getCustomerType, getEnergyType, getProvider } from "@/lib/manifest";
import { getProgramDot } from "@/lib/colors";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FileList } from "@/components/FileList";

export const dynamicParams = false;

export function generateStaticParams() {
  const { providers } = getManifest();
  return providers.flatMap((p) =>
    p.energyTypes.flatMap((e) =>
      e.customerTypes.flatMap((c) =>
        c.programs.map((pr) => ({
          provider: p.slug,
          energy: e.slug,
          customer: c.slug,
          program: pr.slug,
        }))
      )
    )
  );
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ provider: string; energy: string; customer: string; program: string }>;
}) {
  const { provider: pSlug, energy: eSlug, customer: cSlug, program: prSlug } = await params;
  const provider = getProvider(pSlug);
  const energy = getEnergyType(pSlug, eSlug);
  const customer = getCustomerType(pSlug, eSlug, cSlug);
  const program = getProgram(pSlug, eSlug, cSlug, prSlug);
  if (!provider || !energy || !customer || !program) notFound();

  const dotColor = getProgramDot(prSlug);

  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: provider.label, href: `/${pSlug}/` },
          { label: energy.label, href: `/${pSlug}/${eSlug}/` },
          { label: customer.label, href: `/${pSlug}/${eSlug}/${cSlug}/` },
          { label: program.label },
        ]}
      />

      <div className="mt-6 mb-8 flex items-center gap-3">
        <span className={`w-4 h-4 rounded-full flex-shrink-0 ${dotColor}`} />
        <h1 className="text-xl font-bold text-white">{program.label}</h1>
        <span className="text-slate-500 text-sm">
          {program.files.length} {program.files.length === 1 ? "αρχείο" : "αρχεία"}
        </span>
      </div>

      {program.files.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          <p className="text-sm">Δεν υπάρχουν αρχεία σε αυτό το πρόγραμμα</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-w-2xl">
          <FileList files={program.files} />
        </div>
      )}
    </div>
  );
}
