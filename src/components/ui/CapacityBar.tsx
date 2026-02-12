import { getCapacityColor } from "../../logic/capacity";

export default function CapacityBar({
  assigned,
  contract,
}: {
  assigned: number;
  contract: number;
}) {
  const pct = contract > 0 ? Math.min(100, Math.round((assigned / contract) * 100)) : 0;
  const color = getCapacityColor(pct);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">
          {assigned}h / {contract}h
        </span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
