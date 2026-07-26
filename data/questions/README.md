# Question levels

Questions are now separated into content levels:

- `level-1/` — the backed-up original 100 English and Maths questions.
- `level-2/` — the drop-in location and format for 100 spelling questions.
- `templates/` — the original general-purpose island-pack example.

The root `manifest.json` selects the active content level. Level 1 stays active
until the complete Level 2 spelling set is ready.

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
│   └── spelling-island-template.json
└── templates/
    └── example-pack.json
```

For the exact Level 2 filenames, section IDs, ID ranges, and JSON format, read
`level-2/README.md`.

The loader validates unique IDs, four options, and matching answers. Question
files must be served over HTTP, such as `http://localhost:8765/`; browsers
cannot load JSON packs reliably from a `file://` page.
