# 📚 Adding More Islands (Batch 2)

The game reads all questions from the `GAME_DATA` object inside `index.html`.

## Quick Steps

1. Open `index.html` in any text editor
2. Find `const GAME_DATA = {`
3. Paste new section objects into the `sections` array
4. Add matching entries to `ISLAND_THEMES` and `BADGES`
5. Add island positions to `ISLAND_LAYOUT`
6. (Optional) Add a boss design in `createBoss()`
7. Save and test!

## Colour Tips

Use [colorpicker.me](https://colorpicker.me) to pick hex colours.
Format in JS: `0xFF5722` (no # symbol).

## Example New Entry

```javascript
"E6": {
  name: "The Poetry Peaks",
  boss: "The Rhyme Ranger",
  emoji: "🎭",
  islandColor: 0x9C27B0,
  bossColor: 0xE91E63,
  accent: 0xCE93D8,
  type: "english"
}
```
