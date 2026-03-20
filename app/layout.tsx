import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getManifest, getAllSearchRecords } from "@/lib/manifest";
import { SearchBar } from "@/components/SearchBar";
import Link from "next/link";

const inter = Inter({ subsets: ["latin", "greek"] });

export const metadata: Metadata = {
  title: "Ενεργειακά Συμβόλαια | Portal Συνεργατών",
  description: "Εύρεση και λήψη ενεργειακών συμβολαίων για παρόχους ρεύματος και φυσικού αερίου",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const records = getAllSearchRecords();

  return (
    <html lang="el" className="dark">
      <body className={`${inter.className} bg-black bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#4a3a10] via-black to-black bg-fixed text-slate-100 min-h-screen antialiased`}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-[#c99b3b]/20 bg-black/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              {/* Note: User must supply public/logo.png */}
              <img src="/logo.png" alt="We Care Logo" className="h-8 w-auto object-contain" />
              <span className="text-sm font-semibold text-[#c99b3b] group-hover:text-[#e8b958] transition-colors hidden sm:block">
                Συμβόλαια Ενέργειας
              </span>
            </Link>

            <div className="flex-1">
              <SearchBar records={records} />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
