const cfg = {
  high: { label: "Kiireellinen", cls: "bg-red-500/20 text-red-300 border-red-500/40" },
  medium: { label: "Normaali", cls: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" },
  low: { label: "Matala", cls: "bg-green-500/20 text-green-300 border-green-500/40" },
};

export default function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const c = cfg[priority];
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${c.cls}`}>
      {c.label}
    </span>
  );
}
