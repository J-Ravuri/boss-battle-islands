# 📚 Batch 2 Guide — Adding More Islands

This guide shows you how to add the remaining 10 sections (Batch 2) to the game **without changing any game logic**.

## Step 1: Get Your New JSON

When you receive the second batch of 10 sections, it will look like this:

```json
{
  "status": "partial",
  "completedSections": 20,
  "totalPlannedSections": 20,
  "sections": [
    {
      "sectionId": "E6",
      "subject": "English",
      "title": "Your New Section Title",
      "questions": [
        {
          "id": "E6-Q1",
          "question": "Question text here?",
          "options": ["A", "B", "C", "D"],
          "answer": "A",
          "explanation": "Why A is correct."
        }
        // ... 9 more questions
      ]
    }
    // ... 9 more sections
  ]
}
```

## Step 2: Paste Questions into the Game

1. Open `index.html` in a text editor (VS Code, TextEdit, Notepad++, etc.)
2. Search for `const GAME_DATA = {`
3. Find the end of the `sections` array (after the last `M5` section)
4. Add a comma after the closing `}` of the last section
5. Paste your new 10 section objects

## Step 3: Add Theme Data

Search for `const ISLAND_THEMES = {` and add an entry for each new section:

```javascript
const ISLAND_THEMES = {
  // ... existing entries ...
  "E6": { name: "Your Island Name", boss: "Your Boss Name", emoji: "🎭", islandColor: 0xHEXCODE, bossColor: 0xHEXCODE, accent: 0xHEXCODE, type: "english" },
  // ... etc
};
```

| Field | What it does |
|-------|-------------|
| `name` | Island name shown in popup |
| `boss` | Boss name shown in battle |
| `emoji` | Icon for trophy shelf |
| `islandColor` | Main island terrain colour (hex number) |
| `bossColor` | Boss primary colour |
| `accent` | Decoration colour |
| `type` | `"english"` or `"maths"` |

## Step 4: Add Badges

Search for `const BADGES = {` and add:

```javascript
const BADGES = {
  // ... existing entries ...
  "E6": "🏆 Your Badge Name",
  // ... etc
};
```

## Step 5: Add Island Positions

Search for `const ISLAND_LAYOUT = {` and add 3D coordinates:

```javascript
const ISLAND_LAYOUT = {
  // ... existing entries ...
  "E6": [x, y, z],
  // ... etc
};
```

Tip: Place new islands further out or on a new spiral so they don't overlap existing ones.

## Step 6: Add Boss Design (Optional)

Search for `function createBoss(sectionId)` and add a new `case` for your section ID. Use simple Three.js geometries (boxes, spheres, cones, cylinders) to build a fun low-poly character.

If you skip this step, the boss will use a generic placeholder shape.

## Step 7: Save and Test

Save `index.html` and double-click it to open in a browser. The new islands should appear automatically!

## 🎨 Quick Colour Reference

| Colour | Hex Value | Use |
|--------|-----------|-----|
| Sky Blue | `0x87CEEB` | Background |
| Grass Green | `0x4CAF50` | Island top |
| Lava Orange | `0xFF5722` | Boss accents |
| Crystal Pink | `0xEC407A` | English themes |
| Gear Grey | `0x607D8B` | Maths themes |

Use [colorpicker.me](https://colorpicker.me) to find hex values for custom colours.
