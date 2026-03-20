import manifest from "@/public/manifest.json";
import type { Manifest, Provider, EnergyType, CustomerType, Program, SearchRecord } from "./types";

export function getManifest(): Manifest {
  return manifest as Manifest;
}

export function getProvider(providerSlug: string): Provider | undefined {
  return getManifest().providers.find((p) => p.slug === providerSlug);
}

export function getEnergyType(providerSlug: string, energySlug: string): EnergyType | undefined {
  return getProvider(providerSlug)?.energyTypes.find((e) => e.slug === energySlug);
}

export function getCustomerType(
  providerSlug: string,
  energySlug: string,
  customerSlug: string
): CustomerType | undefined {
  return getEnergyType(providerSlug, energySlug)?.customerTypes.find(
    (c) => c.slug === customerSlug
  );
}

export function getProgram(
  providerSlug: string,
  energySlug: string,
  customerSlug: string,
  programSlug: string
): Program | undefined {
  return getCustomerType(providerSlug, energySlug, customerSlug)?.programs.find(
    (p) => p.slug === programSlug
  );
}

export function getAllSearchRecords(): SearchRecord[] {
  const records: SearchRecord[] = [];
  const m = getManifest();

  for (const provider of m.providers) {
    for (const energy of provider.energyTypes) {
      // Energy-level shared files
      for (const file of energy.sharedFiles) {
        records.push({
          providerSlug: provider.slug,
          providerLabel: provider.label,
          energySlug: energy.slug,
          energyLabel: energy.label,
          customerSlug: "",
          customerLabel: "",
          file,
          url: `/${file.path}`,
          breadcrumb: `${provider.label} › ${energy.label}`,
        });
      }

      for (const customer of energy.customerTypes) {
        // Customer-level shared files
        for (const file of customer.sharedFiles) {
          records.push({
            providerSlug: provider.slug,
            providerLabel: provider.label,
            energySlug: energy.slug,
            energyLabel: energy.label,
            customerSlug: customer.slug,
            customerLabel: customer.label,
            file,
            url: `/${file.path}`,
            breadcrumb: `${provider.label} › ${energy.label} › ${customer.label}`,
          });
        }

        for (const program of customer.programs) {
          for (const file of program.files) {
            records.push({
              providerSlug: provider.slug,
              providerLabel: provider.label,
              energySlug: energy.slug,
              energyLabel: energy.label,
              customerSlug: customer.slug,
              customerLabel: customer.label,
              programSlug: program.slug,
              programLabel: program.label,
              file,
              url: `/${file.path}`,
              breadcrumb: `${provider.label} › ${energy.label} › ${customer.label} › ${program.label}`,
            });
          }
        }
      }
    }
  }

  return records;
}
