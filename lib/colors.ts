// Provider accent colors and icons

export const PROVIDER_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  zenith: { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/30", dot: "bg-red-400" },
  iron: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30", dot: "bg-blue-400" },
  volton: { bg: "bg-green-500/15", text: "text-green-300", border: "border-green-500/30", dot: "bg-green-400" },
  protergia: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/30", dot: "bg-orange-400" },
  enerwave: { bg: "bg-teal-500/15", text: "text-teal-300", border: "border-teal-500/30", dot: "bg-teal-400" },
  dei: { bg: "bg-yellow-500/15", text: "text-yellow-300", border: "border-yellow-500/30", dot: "bg-yellow-400" },
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
