"use client";

import Link from "next/link";

interface ColorTheme {
  bg: string;
  text: string;
  border: string;
  dot: string;
}

interface FolderCardProps {
  label: string;
  href: string;
  count?: number;
  colorTheme?: ColorTheme;
  icon?: React.ReactNode;
}

const DEFAULT_THEME: ColorTheme = {
  bg: "bg-slate-800/60",
  text: "text-slate-300",
  border: "border-slate-700/50",
  dot: "bg-slate-400",
};

export function FolderCard({ label, href, count, colorTheme, icon }: FolderCardProps) {
  const theme = colorTheme ?? DEFAULT_THEME;

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${theme.bg} ${theme.border}`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center transition-colors`}>
        {icon ? icon : (
          <span className={`w-4 h-4 rounded-full ${theme.dot}`} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white leading-snug">
          {label}
        </p>
        {count !== undefined && (
          <p className={`text-xs mt-0.5 ${theme.text}`}>
            {count} {count === 1 ? "στοιχείο" : "στοιχεία"}
          </p>
        )}
      </div>

      <svg className={`w-4 h-4 transition-colors flex-shrink-0 ${theme.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}
