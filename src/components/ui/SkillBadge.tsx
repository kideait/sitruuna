import type { Skill } from "../../types";

const skillColors: Record<Skill, string> = {
  ylläpito: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  teollisuus: "bg-orange-500/10 text-orange-700 border-orange-500/30",
  loppusiivous: "bg-purple-500/10 text-purple-700 border-purple-500/30",
  toimisto: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  ikkunat: "bg-cyan-500/10 text-cyan-700 border-cyan-500/30",
};

const skillLabels: Record<Skill, string> = {
  ylläpito: "Ylläpito",
  teollisuus: "Teollisuus",
  loppusiivous: "Loppusiivous",
  toimisto: "Toimisto",
  ikkunat: "Ikkunat",
};

export default function SkillBadge({
  skill,
  highlight = false,
}: {
  skill: Skill;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs rounded-full border ${
        skillColors[skill]
      } ${highlight ? "ring-2 ring-yellow-400/50" : ""}`}
    >
      {skillLabels[skill]}
    </span>
  );
}
