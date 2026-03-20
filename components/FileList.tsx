"use client";

import { useState } from "react";
import type { FileEntry } from "@/lib/types";
import { FileCard } from "./FileCard";
import { PdfViewer } from "./PdfViewer";

interface FileListProps {
  files: FileEntry[];
  title?: string;
}

export function FileList({ files, title }: FileListProps) {
  const [activeFile, setActiveFile] = useState<FileEntry | null>(null);

  if (files.length === 0) return null;

  return (
    <>
      {title && (
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-2">
        {files.map((f) => (
          <FileCard key={f.path} file={f} onPreview={setActiveFile} />
        ))}
      </div>
      <PdfViewer file={activeFile} onClose={() => setActiveFile(null)} />
    </>
  );
}
