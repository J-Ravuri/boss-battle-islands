# Optional custom audio

The game already generates musical sound effects and background music in code.
To replace them with your own files:

1. Drop MP3 files in this folder using these exact names:

   - `island-select.mp3`
   - `battle-start.mp3`
   - `correct.mp3`
   - `wrong.mp3`
   - `combo.mp3`
   - `victory.mp3`
   - `aayasher_bgm.mp3` — optional licensed background track used
     in both the hub and battles

2. Open the repository-root `index.html`.
3. Serve the repository over HTTP and refresh the game. Custom audio is
   already enabled in `index.html`.

Recommended audio:

- Sound effects: 0.1–1.5 seconds.
- Music: seamless loops, 30–90 seconds.
- MP3 at 128–192 kbps is sufficient for a browser game.
- Keep effects punchy but comfortable; normalize files to similar loudness.

If a custom file is unavailable, the game continues using its generated audio.
