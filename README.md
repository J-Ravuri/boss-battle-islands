# 🏝️ Boss Battle Islands

**Shauri's 11+ Adventure** — A browser-based 3D educational game built with Three.js.

Turns 50 UK 11+ exam practice questions (English & Maths) into an engaging boss-battling adventure across floating islands.

![Game Screenshot](screenshot.png)

## 🎮 Play Now

Open `index.html` in any modern web browser. No installation required.

> **Note:** The game loads Three.js from a CDN, so an internet connection is needed on first load.

## 📁 Project Structure

```
.
├── index.html          # The complete game (single file, ~100 KB)
├── README.md           # This file
├── BATCH2_GUIDE.md     # How to add the next 10 sections
├── .gitignore
└── screenshot.png      # (Optional) Add a screenshot here
```

## 🏗️ For Parents / Contributors

### Adding More Islands (Batch 2)

The game is designed to be **extensible without touching game logic**.

1. Open `index.html` in any text editor.
2. Find the `GAME_DATA` object near the top of the `<script>` section.
3. Paste new section objects into the `sections` array.
4. Add matching entries to `ISLAND_THEMES` and `BADGES`.

See [`BATCH2_GUIDE.md`](BATCH2_GUIDE.md) for a detailed walkthrough.

### Reskinning

All colours are defined in CSS `:root` variables and the `ISLAND_THEMES` JavaScript object. Edit hex codes or emoji to change the look without breaking anything.

## 🎯 Game Features

- **10 themed islands** with unique low-poly bosses
- **50 questions** pulled directly from JSON — no rewording
- **WASD / Arrow keys** + **click-to-move** controls
- **No punishment** for wrong answers — gentle retry system
- **XP, levels, and streaks** for motivation
- **Trophy shelf** with replayable islands
- **Session break prompts** every 2 islands
- **localStorage save** — progress persists between sessions

## 🛠️ Tech Stack

- [Three.js](https://threejs.org/) (r128) — 3D engine
- Vanilla HTML/CSS/JS — no build step
- Single-file architecture — runs anywhere

## 📜 License

MIT License — free to use, modify, and share.

## 🙏 Credits

Built for **Shauri** to make 11+ prep fun. Questions sourced from original educational materials.
