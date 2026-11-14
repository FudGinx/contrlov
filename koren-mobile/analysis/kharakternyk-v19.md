# Kharakternyk own-turn limit — v19

User's follow-up changes Kharakternyk from one capture per potion to one capture per own turn. Matching printed-type payment, capture of one active attached attack, own-turn timing and later use of the captured card remain unchanged.

Usage is stored in turnData.catchUsed and resets at the start of the next own turn. Closing or beginning a new potion within the same turn does not refresh it. Existing potion metadata no longer limits this character. Catalog and the active-perk used indicator follow the new scope.

This release includes the v18 draft scrolling, shared card layout, Distiller first-use-per-potion and full-reward Tykhovar corrections. The page asset version advances to v19 so existing clients reload the corrected catalog text.

Validation: build and 79 tests pass, including new same-potion/next-turn and new-potion/same-turn capture regressions. Latest bot conservation/termination results are in folklore-stress.json. Mouse/touch character scrolling, ingredient atlas layout and full-reward shortcut browser checks remain in scripts/browser-v18.mjs.
