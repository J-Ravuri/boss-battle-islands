# Level 3 — Advanced Spelling

This folder contains ten packs of ten advanced spelling questions. The game
discovers them through `manifest.json`; question filenames are never added to
the game engine.

Each pack follows the same shape as Level 2:

```json
{
  "levelId": "level-3",
  "sectionId": "E1",
  "subject": "Spelling",
  "title": "Spelling Island 1",
  "questions": [
    {
      "id": "L3-SP-001",
      "question": "Which spelling is correct?",
      "options": ["delicous", "delicius", "delitious", "delicious"],
      "answer": "delicious",
      "explanation": "Delicious ends in cious.",
      "word": "delicious"
    }
  ]
}
```

Required rules:

- `levelId` must be `level-3`.
- `sectionId` must match an island in this folder's manifest.
- Each file must contain exactly ten questions.
- Every question needs a globally unique ID, four options, and an answer
  exactly equal to one option.
- The `word` target must not duplicate a word in another spelling level.

Level 3 progress is stored under its own `level-3` namespace and cannot
overwrite Level 1 or Level 2 progress.
