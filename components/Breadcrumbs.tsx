"use client";

import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-400 flex-wrap">
      <Link href="/" className="hover:text-white transition-colors">
        Αρχική
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-slate-600">›</span>
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-white transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
