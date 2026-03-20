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

export interface SearchRecord {
  name: string;
  path: string;
  provider: string; // the root folder alias
  breadcrumb: string;
  folderUrl: string;
  searchString: string;
}
