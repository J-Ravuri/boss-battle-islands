# 🌐 GitHub Pages Setup

Want to play the game online without downloading anything? Enable GitHub Pages!

## Step 1: Push to GitHub

Follow the instructions in `PUSH_TO_GITHUB.sh` or the README.

## Step 2: Enable GitHub Pages

1. Go to your repo on GitHub: `https://github.com/J-Ravuri/boss-battle-islands`
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

## Step 3: Wait & Play

After 1-2 minutes, your game will be live at:

```
https://J-Ravuri.github.io/boss-battle-islands/
```

Share that link with Shauri — he can play on any device with a browser!

## 🔄 Updating Later

When you add Batch 2 questions, just edit `index.html`, commit, and push:

```bash
git add index.html
git commit -m "Add Batch 2: 10 new islands"
git push
```

GitHub Pages will update automatically in about a minute.
