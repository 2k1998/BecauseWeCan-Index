// TypeScript types for the manifest

export interface FileEntry {
  name: string;
  path: string; // relative to public/, e.g. "files/zenith/revma/oikiaka/kitrina/Power Home Save.pdf"
}

export interface Program {
  slug: string;
  label: string;
  files: FileEntry[];
}

export interface CustomerType {
  slug: string;
  label: string;
  sharedFiles: FileEntry[];
  programs: Program[];
}

export interface EnergyType {
  slug: string;
  label: string;
  sharedFiles: FileEntry[];
  customerTypes: CustomerType[];
}

export interface Provider {
  slug: string;
  label: string;
  energyTypes: EnergyType[];
}

export interface Manifest {
  providers: Provider[];
}

// Flat record used for search
export interface SearchRecord {
  providerSlug: string;
  providerLabel: string;
  energySlug: string;
  energyLabel: string;
  customerSlug: string;
  customerLabel: string;
  programSlug?: string;
  programLabel?: string;
  file: FileEntry;
  url: string; // full URL path to file
  breadcrumb: string; // human-readable path
}
