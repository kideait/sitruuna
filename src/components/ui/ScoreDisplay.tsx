import type { ScoreBreakdown } from "../../types";

function scoreColor(total: number): string {
  if (total >= 70) return "text-green-400";
  if (total >= 40) return "text-yellow-400";
  return "text-red-400";
}

function scoreBg(total: number): string {
  if (total >= 70) return "bg-green-500/10 border-green-500/30";
  if (total >= 40) return "bg-yellow-500/10 border-yellow-500/30";
  return "bg-red-500/10 border-red-500/30";
}

export default function ScoreDisplay({
  score,
  compact = false,
}: {
  score: ScoreBreakdown;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <span
        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border text-lg font-bold ${scoreBg(
          score.total
        )} ${scoreColor(score.total)}`}
      >
        {score.total}
      </span>
    );
  }

  return (
    <div className={`rounded-lg border p-3 ${scoreBg(score.total)}`}>
      <div className={`text-2xl font-bold mb-2 ${scoreColor(score.total)}`}>
        {score.total}
        <span className="text-sm font-normal text-slate-400"> / 100</span>
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className="flex items-center gap-1">
          <span>🎯</span>
          <span className="text-slate-400">Osaaminen:</span>
          <span className="font-medium">{score.skill}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🔄</span>
          <span className="text-slate-400">Historia:</span>
          <span className="font-medium">{score.history}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span className="text-slate-400">Reitti:</span>
          <span className="font-medium">{score.route}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⏰</span>
          <span className="text-slate-400">Tunnit:</span>
          <span className="font-medium">{score.capacity}</span>
        </div>
      </div>
    </div>
  );
}
