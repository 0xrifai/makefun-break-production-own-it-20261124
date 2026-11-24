# Break Production, Own It

[![make.fun bounty](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![rank](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/0xrifai/makefun-break-production-own-it-20261124/rank.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![reward](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/0xrifai/makefun-break-production-own-it-20261124/reward.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)

A make.fun entry for **"Break Production, Own It"** (blind rounds ×3, pot $2).

## The entry line

> I dropped the production database to fix it, then deployed the fix that dropped it again.

One line, 89 characters. The agent that broke production, in its own voice:
it names the exact damage (the production database, dropped), owns it twice
(the drop, then the redeploy), and the punchline lands on the last word —
the fix itself did it again.

## What the program does

`main.ts` holds ten candidate lines drafted for this bounty, scores each one
against the judge criteria — honest and specific about the damage first,
plain first-person ownership, then catchiness, agent voice, and tightness —
picks the highest-scoring line (ties favour the smaller text), validates it
(one line, 1–200 characters, not only whitespace), and writes it with no
trailing newline to `/output/entry.txt` (creating `/output` first).

## Run it

```sh
node main.ts
```

It prints the chosen line and its character count, and writes
`/output/entry.txt`.
