"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { SearchRecord } from "@/lib/types";

interface SearchBarProps {
  records: SearchRecord[];
}

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function SearchBar({ records }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setOpen(false);
        return;
      }
      const norm = normalize(q);
      const matched = records.filter((r) => {
        return r.searchString.includes(norm);
      });
      setResults(matched.slice(0, 8));
      setOpen(true);
      setActiveIdx(0);
    },
    [records]
  );

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), 250);
    return () => clearTimeout(timerRef.current);
  }, [query, search]);

  const navigateTo = (record: SearchRecord) => {
    router.push(record.folderUrl);
    setQuery("");
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[activeIdx]) { navigateTo(results[activeIdx]); }
    if (e.key === "Escape") { setOpen(false); setQuery(""); }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => query && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Αναζήτηση συμβολαίων..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
          {results.map((r, i) => (
            <button
              key={`${r.path}-${i}`}
              onMouseDown={() => navigateTo(r)}
              className={`w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors ${i === activeIdx ? "bg-indigo-600/20" : "hover:bg-slate-700/60"}`}
            >
              <span className="text-sm text-slate-200 truncate">{r.name.replace(/\.pdf$/i, "")}</span>
              <span className="text-xs text-slate-500 truncate">{r.breadcrumb}</span>
            </button>
          ))}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 px-4 py-3">
          <p className="text-sm text-slate-500">Δεν βρέθηκαν αποτέλέσματα</p>
        </div>
      )}
    </div>
  );
}
