# Character selection, shared card layout and perk corrections — v18

The character selection screen now allocates its remaining height with flex layout. The chosen-player strip scrolls horizontally instead of consuming additional vertical rows. Character tiles use their actual content height; the list reaches the last tile without clipping. Narrow landscape layouts use two columns and a compact header. Native touch scrolling remains available on the tiles and right gutter.

All ingredient atlases use the shared card illustration area. The folklore atlas previously positioned its illustration over the full card. Ruta and Well Moss now participate in the same flex layout as existing ingredients. In-game title zones have a common fixed height, so art, title, effect and negative occupy the same geometry across all sets. Colour frames and printed values are preserved.

Distiller preservation is the first successful distillation of each potion, rather than the first per turn. The usage marker is stored on the active recipe with the other potion metadata, travels through a cauldron exchange and clears when that potion is closed. Subsequent distillations in that potion use ordinary removal/replacement rules. A new potion starts with preservation available. Starting-hand guarantee is unchanged.

Tykhovar no longer subtracts three from the recipe reward. It retains the approved once-per-game last-slot shortcut on 4–5 ingredient recipes and ordinary sabotage timing. Actual ingredients still contribute their normal scores; no points are invented for the skipped ingredient. Catalog text, recipe display and perk control agree with the server calculation.

Validation: build and 77 automated tests pass. New regressions cover preservation across turns/new potions and preservation metadata after exchange. Mouse at 844×390 and emulated touch at 667×250 verify native scrolling with six seats, the last character fully visible and selectable, four representative ingredient layouts across all three atlases, enlarged inspection and full-reward shortcut completion after sabotage. No page errors. This is browser emulation, not physical iPhone Safari testing.
