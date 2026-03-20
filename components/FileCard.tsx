"use client";

import { useState } from "react";
import type { FileEntry } from "@/lib/types";

interface FileCardProps {
  file: FileEntry;
  baseUrl?: string;
  onPreview: (file: FileEntry) => void;
}

export function FileCard({ file, onPreview }: FileCardProps) {
  const [copied, setCopied] = useState(false);

  const fileUrl = `/${file.path}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullUrl = `${window.location.origin}${fileUrl}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Strip .pdf for display
  const displayName = file.name.replace(/\.pdf$/i, "");

  return (
    <div className="group flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-slate-600/60 hover:bg-slate-800/70 transition-all duration-200">
      {/* PDF icon */}
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <span className="text-xs font-bold text-red-400 tracking-tight">PDF</span>
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-300 group-hover:text-white transition-colors truncate" title={file.name}>
          {displayName}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Preview */}
        <button
          onClick={() => onPreview(file)}
          title="Προεπισκόπηση"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Download */}
        <a
          href={fileUrl}
          download={file.name}
          onClick={(e) => e.stopPropagation()}
          title="Λήψη"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </a>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          title={copied ? "Αντιγράφηκε!" : "Αντιγραφή συνδέσμου"}
          className={`p-1.5 rounded-lg transition-all ${copied ? "text-green-400 bg-green-500/10" : "text-slate-400 hover:text-white hover:bg-slate-700"}`}
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          )}
        </button>
      </div>

      {/* Open in tab — always visible */}
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Άνοιγμα"
        className="flex-shrink-0 p-1.5 rounded-lg text-slate-600 hover:text-indigo-400 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    </div>
  );
}
