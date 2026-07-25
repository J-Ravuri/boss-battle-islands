# Background audio

The game generates musical sound effects and a calm **Study Focus** background
track in code. The Study Focus option needs no additional file.

The **AyaSher** option uses `aayasher_bgm.mp3` from this folder. To replace
other generated effects with your own files:

1. Drop MP3 files in this folder using these exact names:

   - `island-select.mp3`
   - `battle-start.mp3`
   - `correct.mp3`
   - `wrong.mp3`
   - `combo.mp3`
   - `victory.mp3`
   - `aayasher_bgm.mp3` — licensed AyaSher background track used in both
     the hub and battles

2. Open the repository-root `index.html`.
3. Serve the repository over HTTP and refresh the game. Custom audio is
   already enabled in `index.html`.

Recommended audio:

- Sound effects: 0.1–1.5 seconds.
- Music: seamless loops, 30–90 seconds.
- MP3 at 128–192 kbps is sufficient for a browser game.
- Keep effects punchy but comfortable; normalize files to similar loudness.

Players can choose AyaSher or Study Focus from the start screen and the in-game
HUD. Their selection is remembered by the browser.

If a custom file is unavailable, the game continues using generated audio.
