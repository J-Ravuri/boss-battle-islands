# Level 2 — Spelling

This folder contains ten packs of ten spelling questions. The game discovers
the files through `manifest.json`; do not add question filenames to
`index.html`.

Every pack uses this shape:

```json
{
  "levelId": "level-2",
  "sectionId": "E1",
  "subject": "Spelling",
  "title": "Spelling Island 1",
  "questions": [
    {
      "id": "L2-SP-001",
      "question": "Choose the correctly spelt word.",
      "options": ["example", "exampple", "exampel", "exsampl"],
      "answer": "example",
      "explanation": "Example is the correct spelling."
    }
  ]
}
```

Required rules:

- `levelId` must be `level-2`.
- `sectionId` must match an island declared in this folder's manifest.
- Each file must contain exactly ten questions.
- Every question needs a unique ID, four options, and an answer exactly equal
  to one of those options.
- Keep explanations brief and child-friendly.

Progress is stored separately under the Level 2 namespace, so changing these
packs cannot overwrite Level 1 progress.
