# Tykhovar completion control — v16

The shortcut previously required dragging the perk token onto the cauldron; ordinary completion controls never activated it. When the shortcut is legal, its existing control now becomes an explicit «Здати −1» action with the recipe discount displayed. The ordinary response, defense and end-turn controls remain available, so using the once-per-game perk is optional.

The action applies the server-validated shortcut and advances to responses when used during a combination. If already defending, it resolves the completed potion. In main/post it uses the existing completion behavior. The last normal ingredient immediately exposes the action without requiring another turn. Rules are unchanged: only the last position of a 4–5 ingredient recipe, once per game, recipe reward −3. Dragging remains supported. The perk portrait opens its explanation.

The primary table click handler processes shortcut completion before its generic draggable-control branch. Perk controls retain their DOM nodes while their state is unchanged. Pointer release no longer replaces the inspected control before the click can reach the document handler. Header portraits receive inspection attributes regardless of which art atlas they use.

Validation: build and 65 automated tests passed. Browser regression in scripts/browser-shortcut.mjs exercises actual frontend act/API handling against engine fixtures: main/post/chain/defense, sabotage before scoring, 5-position recipes, exclusion of 3-position recipes, once-per-game and own-turn limits, keeping the perk for later, portrait inspection and the last normal ingredient unlocking the shortcut. Mouse and touch viewport runs are recorded during release verification. Emulation is not a physical iPhone Safari test.
