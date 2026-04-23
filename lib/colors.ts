// Provider accent colors and icons

export const PROVIDER_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  zenith: { bg: "bg-red-500/25", text: "text-red-300", border: "border-red-500/50", dot: "bg-red-400" },
  iron: { bg: "bg-blue-500/25", text: "text-blue-300", border: "border-blue-500/50", dot: "bg-blue-400" },
  volton: { bg: "bg-green-500/25", text: "text-green-300", border: "border-green-500/50", dot: "bg-green-400" },
  protergia: { bg: "bg-orange-500/25", text: "text-orange-300", border: "border-orange-500/50", dot: "bg-orange-400" },
  enerwave: { bg: "bg-teal-500/25", text: "text-teal-300", border: "border-teal-500/50", dot: "bg-teal-400" },
  dei: { bg: "bg-yellow-500/25", text: "text-yellow-300", border: "border-yellow-500/50", dot: "bg-yellow-400" },
  nrg: { bg: "bg-sky-500/25", text: "text-sky-300", border: "border-sky-500/50", dot: "bg-sky-400" },
  vodafone: { bg: "bg-red-500/25", text: "text-red-300", border: "border-red-500/50", dot: "bg-red-400" },
  nova: { bg: "bg-blue-500/25", text: "text-blue-300", border: "border-blue-500/50", dot: "bg-blue-400" },
  cosmote: { bg: "bg-green-500/25", text: "text-green-300", border: "border-green-500/50", dot: "bg-green-400" },
  // Root category colors
  "ενέργεια": { bg: "bg-amber-500/25", text: "text-amber-300", border: "border-amber-500/50", dot: "bg-amber-400" },
  "τηλεφωνία": { bg: "bg-violet-500/25", text: "text-violet-300", border: "border-violet-500/50", dot: "bg-violet-400" },
};

export const PROGRAM_COLORS: Record<string, string> = {
  kitrino: "bg-yellow-400",
  kitrina: "bg-yellow-400",
  mple: "bg-blue-400",
  prasino: "bg-green-400",
  prasina: "bg-green-400",
  portokali: "bg-orange-400",
  stathero: "bg-slate-400",
  kymainom: "bg-teal-400",
  koinoxristo: "bg-pink-400",
  "kentriki-thermanssi": "bg-red-400",
};

export function getProviderColor(slug: string) {
  return PROVIDER_COLORS[slug] ?? { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-500/30", dot: "bg-slate-400" };
}

export function getProgramDot(slug: string) {
  return PROGRAM_COLORS[slug] ?? "bg-slate-400";
}
