# Hero Locker rewards

`catalog.json` contains the deterministic cross-level reward catalogue.

Each `offers` entry maps one curriculum level and island section to two or
three items. Item slots are:

- `weapon`
- `head`
- `back`
- `outfit`

Supported rarities are `common`, `rare`, `epic`, and `legendary`. Rarity only
changes appearance and effects; gear never changes question difficulty,
scores, or combat power.

On a first clear, the player chooses one item. A later perfect 10/10 clear
unlocks every remaining item in that island's offer. Nothing is random or
purchasable.

Unlocked and equipped items are stored in
`bossBattleIslands_hero_profile_v1`, separate from the three level-progress
keys so one loadout follows the hero between levels.
