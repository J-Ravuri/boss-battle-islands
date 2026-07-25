#!/bin/bash
# ================================================================
#  PUSH TO GITHUB — Copy-paste these commands in your terminal
# ================================================================

# 1. Navigate to the project folder
cd boss-battle-islands

# 2. Initialize git (skip if already a git repo)
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: Boss Battle Islands - Shauri's 11+ Adventure"

# 5. Connect to your GitHub repo
#    (If the repo doesn't exist yet, create it first at:
#     https://github.com/new )
#
#    Then run ONE of the following:

# Option A: If your repo is EMPTY (no README yet):
git remote add origin https://github.com/J-Ravuri/boss-battle-islands.git
git branch -M main
git push -u origin main

# Option B: If your repo ALREADY has files (e.g. an existing README):
# git remote add origin https://github.com/J-Ravuri/boss-battle-islands.git
# git branch -M main
# git pull origin main --rebase
# git push -u origin main

# ================================================================
#  DONE! Your game should now be live at:
#  https://J-Ravuri.github.io/boss-battle-islands/
#  (after enabling GitHub Pages in repo Settings)
# ================================================================
