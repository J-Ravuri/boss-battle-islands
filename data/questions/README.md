# Drop-in question packs

All game questions live in this folder. The ten registered island packs contain
the current 100 questions; `index.html` now contains only island metadata.
Files are loaded in the order shown in `manifest.json` when the game runs over
HTTP.

## Current packs

- `e1-vocabulary.json`
- `e2-retrieval-evidence.json`
- `e3-inference.json`
- `e4-character.json`
- `e5-summary-purpose.json`
- `m1-word-problems-data.json`
- `m2-fractions-probability.json`
- `m3-percentages.json`
- `m4-time-timetables.json`
- `m5-measurement.json`

## Add a pack

1. Copy `example-pack.json` and give the copy a descriptive filename, such as
   `english-vocabulary-02.json`.
2. Set `sectionId` to one of the existing islands:
   `E1`, `E2`, `E3`, `E4`, `E5`, `M1`, `M2`, `M3`, `M4`, or `M5`.
3. Keep `"mode": "append"` to add questions to the registered island pack.
   Use `"replace"` only when that file should become the complete question set
   for its section. Manifest order matters when combining packs.
4. Give every question a unique `id`.
5. Add the filename to `manifest.json`.
6. Refresh the game at `http://localhost:8765/`.

Example manifest:

```json
{
  "files": [
    "english-vocabulary-02.json",
    "maths-fractions-02.json"
  ]
}
```

## Question format

```json
{
  "sectionId": "M2",
  "mode": "append",
  "questions": [
    {
      "id": "M2-CUSTOM-001",
      "question": "What is one half of 18?",
      "options": ["6", "8", "9", "12"],
      "answer": "9",
      "explanation": "One half means divide by two: 18 ÷ 2 = 9."
    }
  ]
}
```

Each question must contain:

- `id`: unique text identifier.
- `question`: the prompt.
- `options`: exactly four answer strings.
- `answer`: must exactly match one item in `options`.
- `explanation`: short teaching feedback.

The loader skips missing/duplicate IDs and unknown section IDs without
crashing the game. Check the browser console for `[QUESTIONS]` messages when
validating a new pack. Question packs require `http://localhost` or another web
server; browsers do not allow this loading workflow from `file://` pages.
