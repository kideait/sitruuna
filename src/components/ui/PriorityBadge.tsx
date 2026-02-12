const cfg = {
  high: { label: "Kiireellinen", cls: "bg-red-500/10 text-red-700 border-red-500/30" },
  medium: { label: "Normaali", cls: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30" },
  low: { label: "Matala", cls: "bg-green-500/10 text-green-700 border-green-500/30" },
};

export default function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const c = cfg[priority];
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${c.cls}`}>
      {c.label}
    </span>
  );
}
