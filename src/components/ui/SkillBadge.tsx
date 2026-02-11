import type { Skill } from "../../types";

const skillColors: Record<Skill, string> = {
  ylläpito: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  teollisuus: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  loppusiivous: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  toimisto: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  ikkunat: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
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
