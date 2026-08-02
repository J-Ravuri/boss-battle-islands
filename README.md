# 🏝️ Boss Battle Islands

**Shauri's 11+ Adventure** is a Three.js learning game with four numbered
adventures, 360 curriculum questions, collectible hero gear, parent learning
reports, and a separate personalised **Practice Camp**.

## Play

- Live game: <https://j-ravuri.github.io/boss-battle-islands/>
- Local game:

```bash
cd /Users/jravuri/Documents/AI-Tutorial/boss-battle-islands
python3 -m http.server 8765
```

Then open <http://localhost:8765/>. The game must be served over HTTP because
its manifests and question packs are loaded with `fetch`; opening `index.html`
as a `file://` URL is not supported.

## Personalised Practice Camp

Practice Camp is an optional, parent-controlled content source. It uses the
same battle and learning-evidence flow as the numbered adventures, while its
score and completion stay separate from level XP, islands, trophies, and gear.

To install a newly reviewed pack:

1. Generate and review a ten-question pack in `shauri-practice-builder` once
   its analyser and generation UI are complete.
2. Replace `data/questions/practice-camp/current-pack.json` with that pack.
3. Run `npm test` before committing or publishing.
4. Reload the game. The title screen shows **Practice Pack Ready** with the
   pack title.

The game never contains or calls an OpenAI API key. Generation remains in the
separate local parent tool. See
[`data/questions/practice-camp/README.md`](data/questions/practice-camp/README.md)
for the exact rules.

## Important files

| Path | Purpose |
| --- | --- |
| `index.html` | Three.js engine, battle flow, UI, saves, Parent Progress, and Practice Camp integration |
| `data/questions/manifest.json` | Registry for Levels 1–4 and Practice Camp |
| `data/questions/level-*/` | Numbered-level manifests and question packs |
| `data/questions/practice-camp/` | Optional personalised pack slot and instructions |
| `data/gear/catalog.json` | Guaranteed milestone reward choices |
| `tools/validate-phase1.js` | Numbered-level content validation |
| `tools/validate-practice-pack.js` | Strict Practice Camp validation |

## Validate changes

```bash
cd /Users/jravuri/Documents/AI-Tutorial/boss-battle-islands
npm test
```

This checks all 360 numbered-level questions and the active Practice Camp pack.
Malformed optional content is skipped with a friendly game fallback instead of
crashing the core adventures.

## Technology

- Three.js 0.160 loaded from a CDN
- Plain HTML, CSS, and JavaScript; no build step
- JSON question content kept separate from game logic
- Browser `localStorage` with namespaced progress per level and a separate
  per-profile Hero Locker

## License

MIT License
