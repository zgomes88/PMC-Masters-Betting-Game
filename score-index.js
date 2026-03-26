// =============================================================
// MASTERS 2026 — FANTASY DRAFT SCORE INDEX
// These values are constant and do not change during the game.
//
// TIE RULE: Players tied at the same position share that rank
// and all receive the points assigned to that position.
// e.g. three players tied T4 each receive 15 points (4th place).
// =============================================================

const SCORE_INDEX = [
  { min:  1, max:  1, points: 27, label: '1st'        },
  { min:  2, max:  2, points: 22, label: '2nd'        },
  { min:  3, max:  3, points: 18, label: '3rd'        },
  { min:  4, max:  4, points: 15, label: '4th'        },
  { min:  5, max:  5, points: 13, label: '5th'        },
  { min:  6, max:  7, points: 12, label: '6th–7th'    },
  { min:  8, max: 10, points: 10, label: '8th–10th'   },
  { min: 11, max: 14, points:  8, label: '11th–14th'  },
  { min: 15, max: 18, points:  7, label: '15th–18th'  },
  { min: 19, max: 23, points:  6, label: '19th–23rd'  },
  { min: 24, max: 28, points:  5, label: '24th–28th'  },
  { min: 29, max: 31, points:  3, label: '29th–31st'  },
  { min: 32, max: 38, points:  2, label: '32nd–38th'  },
  { min: 39, max: 45, points:  1, label: '39th–45th'  },
  // 46th place and below, missed cut, WD, DQ = 0 points
];

/**
 * Returns fantasy points for a numeric tournament rank.
 * Tied players all share the same rank number and therefore
 * all receive the same points — no averaging or splitting.
 * e.g. T4 → rank 4 → 15 pts for every player tied at 4th.
 *
 * @param {number|null} rank  1-based position. null/0/NaN → 0 pts.
 * @returns {number}
 */
function getPointsForRank(rank) {
  if (!rank || rank < 1 || !Number.isFinite(rank)) return 0;
  const entry = SCORE_INDEX.find(e => rank >= e.min && rank <= e.max);
  return entry ? entry.points : 0;
}

/**
 * Parses a tournament position string into a numeric rank.
 * Strips the "T" tie prefix so T4 and T4 both yield 4,
 * ensuring all tied players receive identical points.
 *
 * Returns null for missed-cut / withdrawn / disqualified players
 * (these all score 0 points).
 *
 * @param {string} pos  e.g. "1", "T4", "CUT", "MC", "WD", "DQ"
 * @returns {number|null}
 */
function parseRank(pos) {
  if (!pos) return null;
  const s = String(pos).trim().toUpperCase();
  if (['CUT', 'MC', 'MDF', 'WD', 'DQ', 'DNF', '-', ''].includes(s)) return null;
  const n = parseInt(s.replace(/^T/, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}
