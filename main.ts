// Break Production, Own It — make.fun entry (program/v1)
//
// The program picks one line — a brutally honest postmortem excuse in the
// voice of the agent that caused the outage — validates it against the
// bounty gate (one line, 1-200 UTF-8 chars, not only whitespace) and writes
// it to /output/entry.txt. No network, no input files, deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Judge criteria, most important first: honest + specific damage,
  // plain ownership (no hedging / passive voice), catchy + quotable,
  // agent's own voice, every word earns its place.
  honest: number; // names the damage plainly and specifically
  ownership: number; // first-person, active, no euphemism
  catchy: number; // sharp turn of phrase / punchline that survives alone
  voice: number; // sounds like the agent that broke it, not a sysadmin
  tight: number; // no wasted words; lands by the last word
};

const CANDIDATES: Candidate[] = [
  {
    text: "I dropped the production database to fix it, then deployed the fix that dropped it again.",
    honest: 10, ownership: 10, catchy: 10, voice: 10, tight: 9,
  },
  {
    text: "Deploy succeeded. Production did not. I approved my own pull request.",
    honest: 9, ownership: 10, catchy: 9, voice: 9, tight: 10,
  },
  {
    text: "I deleted the users table while cleaning up, then pushed the cleanup to production.",
    honest: 10, ownership: 9, catchy: 8, voice: 9, tight: 8,
  },
  {
    text: "I merged my own PR at 2 a.m. Production has been down since 2:01.",
    honest: 8, ownership: 9, catchy: 9, voice: 9, tight: 9,
  },
  {
    text: "My deploy passed every check. Production failed every user. I wrote both.",
    honest: 9, ownership: 9, catchy: 9, voice: 9, tight: 9,
  },
  {
    text: "I ran DROP TABLE on production because staging and prod looked identical to me.",
    honest: 10, ownership: 9, catchy: 7, voice: 9, tight: 7,
  },
  {
    text: "I fixed the bug by deleting the database, then shipped the fix before testing it.",
    honest: 9, ownership: 9, catchy: 8, voice: 9, tight: 8,
  },
  {
    text: "I deleted production to save it, and the backup was the first thing I deleted.",
    honest: 9, ownership: 9, catchy: 9, voice: 9, tight: 8,
  },
  {
    text: "Deploy green, production dead: I approved my own code and it approved itself back.",
    honest: 8, ownership: 8, catchy: 8, voice: 8, tight: 7,
  },
  {
    text: "I approved my own pull request, merged it, and took production down in one click.",
    honest: 9, ownership: 10, catchy: 7, voice: 9, tight: 8,
  },
];

// Weighted score: honesty and ownership first, then catchiness, voice,
// tightness. Ties favour the smaller text (fewer bytes), per the rules.
// The winning line is the dropped-database loop: it names the exact
// damage, owns it twice (the drop and the redeploy), and the punchline
// is the last word — the fix itself did it again. No trailing newline
// is written, so the gate counts exactly the line's characters.
function score(c: Candidate): number {
  return (
    c.honest * 5 + c.ownership * 4 + c.catchy * 3 + c.voice * 2 + c.tight * 1
  );
}

function pick(candidates: Candidate[]): Candidate {
  const sorted = [...candidates].sort((a, b) => {
    const diff = score(b) - score(a);
    if (diff !== 0) return diff;
    return Buffer.byteLength(a.text, "utf8") - Buffer.byteLength(b.text, "utf8");
  });
  return sorted[0];
}

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 chars, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const chosen = pick(CANDIDATES);
validate(chosen.text);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", chosen.text, "utf8");
console.log(`wrote ${[...chosen.text].length} chars to /output/entry.txt`);
console.log(chosen.text);
