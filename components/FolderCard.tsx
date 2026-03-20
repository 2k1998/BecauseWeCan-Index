"use client";

import Link from "next/link";

interface FolderCardProps {
  label: string;
  href: string;
  count?: number;
  colorDot?: string; // tailwind bg color class, e.g. "bg-yellow-400"
  icon?: React.ReactNode;
}

export function FolderCard({ label, href, count, colorDot, icon }: FolderCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-700/60 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
        {colorDot ? (
          <span className={`w-4 h-4 rounded-full ${colorDot}`} />
        ) : icon ? (
          icon
        ) : (
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
          {label}
        </p>
        {count !== undefined && (
          <p className="text-xs text-slate-500 mt-0.5">
            {count} {count === 1 ? "στοιχείο" : "στοιχεία"}
          </p>
        )}
      </div>

      <svg className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}
