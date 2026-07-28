# Background audio

The **Study Focus** option uses `study_meditation_bgm.wav`, an original
royalty-free meditation loop created for this game. If that file is missing,
the game generates a calm fallback track in code.

The **Hanuman** option uses `../hanuman.mp3`. To replace
other generated effects with your own files:

1. Drop MP3 files in this folder using these exact names:

   - `island-select.mp3`
   - `battle-start.mp3`
   - `correct.mp3`
   - `wrong.mp3`
   - `combo.mp3`
   - `victory.mp3`
   - `../hanuman.mp3` — Hanuman background track used in both the hub and
     battles
   - `study_meditation_bgm.wav` — original royalty-free Study Focus loop

2. Open the repository-root `index.html`.
3. Serve the repository over HTTP and refresh the game. Custom audio is
   already enabled in `index.html`.

Recommended audio:

- Sound effects: 0.1–1.5 seconds.
- Music: seamless loops, 30–90 seconds.
- MP3 at 128–192 kbps is sufficient for a browser game.
- Keep effects punchy but comfortable; normalize files to similar loudness.

Players can choose Hanuman or Study Focus from the start screen and the in-game
HUD. Their selection is remembered by the browser.

If a custom file is unavailable, the game continues using generated audio.

To recreate the Study Focus file, run:

```bash
node tools/generate-study-music.js
```
