import type { IplStudy } from "./types";

/**
 * IPL data study — every figure computed from the committed matches.csv in
 * github.com/HusainMain/IPL_Analysis (1,095 rows, 2008–2024).
 *
 * Derivation, so the numbers can be reproduced:
 * - Toss winner's win rate: rows where `winner === toss_winner` after franchise
 *   renaming, over the 1,090 rows that record a result (554 / 1,090).
 * - Chasing side's win rate: batting order derived from `toss_decision` — if the
 *   toss winner batted, they batted first; otherwise the other side did. Defined
 *   for every match, so the denominator is 1,095 (595 / 1,095).
 * - Season shares: same chase calculation grouped by the raw season label, with
 *   2007/08, 2009/10 and 2020/21 read as the 2008, 2010 and 2020 editions.
 *
 * These are descriptive, not causal: chasing is confounded with era, venue and
 * team strength. The page says so rather than overclaiming.
 */
export const ipl: IplStudy = {
  eyebrow: "EVIDENCE / IPL 2008—2024",
  headline: "Winning the toss is luck. ",
  headlineAccent: "What you do next isn't.",
  lead: "Across 1,095 IPL matches, the toss winner went on to win 50.8% of the time — a coin flip. But 64% of captains chose to field after winning it, and the chasing side won 54.3% of all matches.",
  views: [
    {
      label: "Toss winner",
      value: 50.8,
      wins: 554,
      total: 1090,
      note: "Toss winners who went on to win the match. Indistinguishable from a coin.",
    },
    {
      label: "Chasing side",
      value: 54.3,
      wins: 595,
      total: 1095,
      note: "Matches won by the side batting second, across the full dataset.",
    },
  ],
  baseline: 50,
  baselineLabel: "coin flip",
  provenance: [
    { label: "Dataset", value: "IPL 2008–2024 · matches.csv" },
    { label: "Scope", value: "1,095 matches · 17 seasons" },
    { label: "Method", value: "pandas · innings aggregation" },
  ],
  seasons: [
    { season: "2008", matches: 58, chasePct: 62.1 },
    { season: "2009", matches: 57, chasePct: 52.6 },
    { season: "2010", matches: 60, chasePct: 46.7 },
    { season: "2011", matches: 73, chasePct: 56.2 },
    { season: "2012", matches: 74, chasePct: 54.1 },
    { season: "2013", matches: 76, chasePct: 51.3 },
    { season: "2014", matches: 60, chasePct: 61.7 },
    { season: "2015", matches: 59, chasePct: 45.8 },
    { season: "2016", matches: 60, chasePct: 68.3 },
    { season: "2017", matches: 59, chasePct: 55.9 },
    { season: "2018", matches: 60, chasePct: 53.3 },
    { season: "2019", matches: 60, chasePct: 61.7 },
    { season: "2020", matches: 60, chasePct: 50.0 },
    { season: "2021", matches: 60, chasePct: 61.7 },
    { season: "2022", matches: 74, chasePct: 50.0 },
    { season: "2023", matches: 74, chasePct: 45.9 },
    { season: "2024", matches: 71, chasePct: 50.7 },
  ],
  source: "https://github.com/HusainMain/IPL_Analysis",
  ctaLabel: "Read the data study",
  ctaHref: "/work/ipl-analysis",
};
