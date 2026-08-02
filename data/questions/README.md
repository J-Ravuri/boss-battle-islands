# Question levels

Questions are separated into content levels and every level is loaded through
the same manifest-driven registry:

- `level-1/` — the backed-up original 100 English and Maths questions.
- `level-2/` — 100 spelling questions across ten spelling islands.
- `level-3/` — 100 advanced spelling questions across ten new islands.
- `level-4/` — 60 synonym and antonym questions across four islands.
- `practice-camp/` — one optional parent-reviewed personalised pack. Its
  results do not alter numbered-level XP, trophies, islands, or gear.
- `templates/` — the original general-purpose island-pack example.

The root `manifest.json` registers the available levels. Its `activeLevel` is
only the default shown on first load; players can switch levels from the game's
level selector at any time. Each nested level manifest owns that level's
islands, paths, bosses, badges, and question-file list.

## Folder structure

```text
data/questions/
├── manifest.json
├── level-1/
│   ├── manifest.json
│   └── 10 JSON packs containing 100 existing questions
├── level-2/
│   ├── README.md
│   ├── manifest.json
│   └── spelling-island-01.json … spelling-island-10.json
├── level-3/
│   ├── README.md
│   ├── manifest.json
│   └── spelling-island-01.json … spelling-island-10.json
├── level-4/
│   ├── README.md
│   ├── manifest.json
│   └── 4 synonym/antonym packs containing 60 questions
├── practice-camp/
│   ├── README.md
│   ├── manifest.json
│   └── current-pack.json
└── templates/
    └── example-pack.json
```

For the exact Level 2 format, read `level-2/README.md`.

The common loader validates the level ID, known section, ten questions per
file, unique IDs, exactly four options, and answers that match an option.
Invalid packs produce a clear console warning and are skipped without crashing
the game. Files must be served over HTTP, such as
`http://localhost:8765/`; browsers cannot load JSON packs reliably from a
`file://` page.

To add another level, add its folder and manifest, then register that manifest in the
root `levels` object. No core engine changes are required.

Practice Camp is intentionally not a numbered level. Replace only
`practice-camp/current-pack.json`, keep `levelId: "practice-camp"`,
`sectionId: "P1"`, and `mode: "replace"`, then run:

```bash
npm run validate:practice
```

Every Practice Camp question must be parent-reviewed (`verified: true`) and
have a `PC-` ID, four distinct options, an exact matching answer, `domain`, and
`skillId`. The validator also rejects duplicated target words from Levels 1–4.

Boss reward choices are configured separately in `../gear/catalog.json`.
