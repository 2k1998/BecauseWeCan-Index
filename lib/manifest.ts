import manifestJson from "../public/manifest.json";

export interface FileNode {
  name: string;
  type: "file" | "directory";
  path: string;
  children?: FileNode[];
}

export const manifest = manifestJson as FileNode[];

// Flattens the tree for generating all paths
export function getAllDirectoryPaths(nodes: FileNode[] = manifest): string[] {
  let dirs: string[] = [];
  for (const node of nodes) {
    if (node.type === "directory") {
      dirs.push(node.path);
      if (node.children) {
        dirs = dirs.concat(getAllDirectoryPaths(node.children));
      }
    }
  }
  return dirs;
}

export function getFolderContent(targetPath: string, nodes: FileNode[] = manifest): FileNode[] {
  if (!targetPath) return nodes; // root
  const parts = targetPath.split("/");
  let currentOpts = nodes;
  
  for (const part of parts) {
    const found = currentOpts.find((n) => n.name === part && n.type === "directory");
    if (found && found.children) {
      currentOpts = found.children;
    } else {
      return [];
    }
  }
  return currentOpts;
}

export interface SearchRecord {
  name: string;
  path: string;
  provider: string; // the root folder alias
  breadcrumb: string;
  folderUrl: string;
  searchString: string;
}

export function getSearchIndex(nodes: FileNode[] = manifest, providerStr = "", breadcrumbStr = ""): SearchRecord[] {
  let records: SearchRecord[] = [];
  for (const node of nodes) {
    if (node.type === "directory") {
      const newProvider = providerStr || node.name;
      const newBreadcrumb = breadcrumbStr ? `${breadcrumbStr} / ${node.name}` : node.name;
      if (node.children) {
        records = records.concat(getSearchIndex(node.children, newProvider, newBreadcrumb));
      }
    } else if (node.type === "file") {
      const parentParts = node.path.split("/").slice(0, -1);
      const folderUrl = `/folder/${parentParts.map(encodeURIComponent).join('/')}`;
      records.push({
        name: node.name,
        path: node.path,
        provider: providerStr,
        breadcrumb: breadcrumbStr,
        folderUrl,
        searchString: `${providerStr} ${breadcrumbStr} ${node.name}`.toLowerCase(),
      });
    }
  }
  return records;
}
