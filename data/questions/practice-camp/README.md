# Practice Camp

`current-pack.json` is the one reviewed, personalised pack currently available
in the game. Replace that file with the validated download from the local
Shauri Practice Pack Builder, then run:

```bash
npm run validate:practice
npm test
```

The pack must keep `levelId: "practice-camp"`, `sectionId: "P1"`,
`mode: "replace"`, and exactly ten questions. Each question needs a globally
unique ID, four distinct options, an answer that exactly matches one option,
an explanation, `domain`, `skillId`, and `verified: true`.

Use a fresh ID prefix for every replacement, for example
`PC-20260802-SUFFIX-001`. Reusing IDs would combine results from different
questions in the learning report.

The live GitHub Pages game changes only after the replacement file has been
committed and pushed. Never put an OpenAI API key or a raw learning export in
this repository.
