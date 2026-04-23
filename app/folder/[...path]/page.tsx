import { notFound } from "next/navigation";
import { getFolderContent, getAllDirectoryPaths } from "@/lib/manifest";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FolderCard } from "@/components/FolderCard";
import { FileList } from "@/components/FileList";
import { PROVIDER_COLORS } from "@/lib/colors";

// Pre-render ALL directory routes!
export function generateStaticParams() {
  const dirs = getAllDirectoryPaths();
  return dirs.map(dir => {
    return { path: dir.split('/') };
  });
}

export default async function FolderPage({ params }: { params: Promise<{ path: string[] }> }) {
  // App router in Next.js >15 passes params as a Promise.
  const resolvedParams = await params;
  // Next.js static generation passes the encoded strings (like %CE%95...) due to our encodeURIComponent in generateStaticParams.
  // We MUST decode them so they match the Greek names in the manifest.json
  const decodedSegments = resolvedParams.path.map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });
  const currentPathStr = decodedSegments.join('/');

  const contents = getFolderContent(currentPathStr);

  if (!contents || contents.length === 0) {
    notFound();
  }

  const directories = contents.filter(c => c.type === 'directory');
  
  // Transform filesystem objects into FileCard props
  const files = contents.filter(c => c.type === 'file').map(f => ({
    name: f.name,
    path: `files/${f.path}` // We map it as needed for the client
  }));

  const crumbs = [
    { label: "Αρχική", href: "/" },
    ...decodedSegments.map((segment, index) => ({
      label: segment,
      href: `/folder/${resolvedParams.path.slice(0, index + 1).join('/')}`
    }))
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Breadcrumbs crumbs={crumbs} />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {decodedSegments[decodedSegments.length - 1] || "Φάκελος"}
          </h1>
          {directories.length === 0 && files.length === 0 && (
             <p className="mt-4 text-slate-400">Ο φάκελος {decodedSegments[decodedSegments.length - 1]} είναι κενός.</p>
          )}
        </div>

        {/* Sub-directories */}
        {directories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {directories.map((dir) => {
              // Construct the exact URL without manual encoding
              const linkUrl = `/folder/${resolvedParams.path.join('/')}/${dir.name}`;
              
              // Determine folder color theme
              const slugMap: Record<string, string> = {
                "ζενίθ": "zenith",
                "ήρων": "iron",
                "δεη": "dei",
              };
              const colorSlug = slugMap[dir.name.toLowerCase()] || dir.name.toLowerCase();
              const colorTheme = PROVIDER_COLORS[colorSlug];

              return (
                <FolderCard
                  key={dir.name}
                  href={linkUrl}
                  label={dir.name}
                  colorTheme={colorTheme}
                />
              );
            })}
          </div>
        )}

        {/* Files List */}
        {files.length > 0 && (
          <div className="mt-8">
            <FileList files={files} title="Αρχεία Συμβολαίων" />
          </div>
        )}
      </div>
    </div>
  );
}
