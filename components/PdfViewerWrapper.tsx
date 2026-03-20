"use client";

import { useState } from "react";
import type { FileEntry } from "@/lib/types";
import { PdfViewer } from "./PdfViewer";

interface PdfViewerWrapperProps {
  children: (onPreview: (file: FileEntry) => void) => React.ReactNode;
}

export function PdfViewerWrapper({ children }: PdfViewerWrapperProps) {
  const [activeFile, setActiveFile] = useState<FileEntry | null>(null);

  return (
    <>
      {children(setActiveFile)}
      <PdfViewer file={activeFile} onClose={() => setActiveFile(null)} />
    </>
  );
}
