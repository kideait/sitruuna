import type { ScoreBreakdown } from "../../types";

function scoreColor(total: number): string {
  if (total >= 70) return "#94d60a";
  if (total >= 40) return "#e5c700";
  return "#ef4444";
}

function scoreBorder(total: number): string {
  if (total >= 70) return "#94d60a30";
  if (total >= 40) return "#e5c70030";
  return "#ef444430";
}

function scoreBg(total: number): string {
  if (total >= 70) return "#94d60a10";
  if (total >= 40) return "#e5c70010";
  return "#ef444410";
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
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg font-bold"
        style={{ background: scoreBg(score.total), border: `1px solid ${scoreBorder(score.total)}`, color: scoreColor(score.total) }}
      >
        {score.total}
      </span>
    );
  }

  return (
    <div className="rounded-lg p-3" style={{ background: scoreBg(score.total), border: `1px solid ${scoreBorder(score.total)}` }}>
      <div className="text-2xl font-bold mb-2" style={{ color: scoreColor(score.total) }}>
        {score.total}
        <span className="text-sm font-normal" style={{ color: "#94a898" }}> / 100</span>
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className="flex items-center gap-1">
          <span>🎯</span>
          <span style={{ color: "#94a898" }}>Osaaminen:</span>
          <span className="font-medium">{score.skill}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🔄</span>
          <span style={{ color: "#94a898" }}>Historia:</span>
          <span className="font-medium">{score.history}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span style={{ color: "#94a898" }}>Reitti:</span>
          <span className="font-medium">{score.route}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⏰</span>
          <span style={{ color: "#94a898" }}>Tunnit:</span>
          <span className="font-medium">{score.capacity}</span>
        </div>
      </div>
    </div>
  );
}
