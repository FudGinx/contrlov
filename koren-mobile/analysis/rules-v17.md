# Approved folklore rules — v17

Implements the user's consolidated approval after the two paper reviews. The active roster contains 19 characters: 13 retained/reworked characters, Kharakternyk, Perelesnyk, Blud, Chugaister, Vodianyk and Domovyk. Wanderer, Beekeeper and Storyteller are retired from new character drafts.

- Harvest characters choose one printed-type ingredient from the whole discard instead of one of the three start-of-turn draws. Random fallback is optional. Selection happens before the remaining draws so an empty deck cannot reshuffle the selected candidate away. This is separate from the existing top-five recovery ingredient effect.
- Kharakternyk pays a matching printed-type hand ingredient to capture one attached active attack, once per potion.
- Witch mushrooms may attack any printed type, within the normal one-response and three-attached-card limits.
- Perelesnyk swaps both active recipes, ingredients, attacks and potion metadata, spending the normal addition. Own potion needs two real ingredients. Both potions are marked swapped; neither becomes new and effects are not replayed.
- Blud spends the normal addition to append one random final type without reward increase. One application per own turn and one added position per specific potion. Complete recipes and the variable-length chaos recipe are excluded.
- Chugaister returns one shared ward/distillation per round, marked before the card can be reused. Domovyk discards one hand ingredient as a ward per own turn.
- Mavka grants one immediate additional universal ingredient following own moss per potion. Mosskeeper retrieves moss and substitutes one needed position per potion. Chumak draws four and may use a traded ingredient as a wildcard once per turn through the following own turn.
- Vorozhka zeroes the numeric contribution of one own ingredient and all its attacks per potion; cards, effects and physical counts remain active. Molfar reorders two unfilled slots once per potion. Travnytsia changes an adjacent unfilled pair in a 4–5 slot recipe to flowers/liquid without a reward discount.
- Pasichnyk replaces an earlier own insect, preserves its played-as slot, discards the old ingredient and its attacks, triggers the new effect and spends the normal addition, once per turn.
- Distiller receives one real distillation within the starting five cards. The first distillation per own turn removes only attached sabotage. Later distillations use the ordinary removal/replacement rule.
- Tykhovar and Miniailo retain their approved shortened-recipe and two-for-one abilities.

The 80-card deck now contains 16 continuation ingredients rather than 18. One flower continuation and one moss continuation were replaced by Ruta and Well Moss, both +1/−1 with no effect, keeping twelve ingredients per printed type and the same aggregate printed values. A generated Ukrainian folklore atlas supplies six portraits and these two ingredient illustrations.

The recipe deck contains three copies of each of eleven authored normal recipes and one Chortiv Kazan (34 orders). Normal recipes use each ingredient type exactly 21 times. They include adjacent repeated types and rewards 5–12. Values are initial playtest values, not a claim of solved competitive balance.

Chortiv Kazan accepts any number/types and can complete after one own physical ingredient. Completion score is ordinary brew score plus the number of own and attached physical ingredient cards, including cancelled attacks; whites and neutral markers do not count. Minimum total zero. Abort scores only ordinary brew score. Completion is contextual on the cauldron after responses or before passing, and never ends the turn itself.

After sabotage, one finish-turn request resolves a completed ordinary potion and advances the turn atomically. White defense and replacement brewing remain available before that request. Opening a market is own-turn only; bids and resolution of an existing exchange remain asynchronous.

Validation:

- Build and all 74 automated tests pass, including server privacy/concurrency, offline start and meaningful new-rule regressions.
- 285 bot games across all 19 identities and 2/4/6 players finish; every post-deal action conserves all 80 physical cards, with at most three attacks per ingredient. Latest results: folklore-stress.json. This is functional testing, not human balance evidence.
- Chrome mouse (844×390) and emulated touch (667×250) exercise actual frontend action requests against engine fixtures: one confirmation, contextual chaos completion, witch attack, harvest, capture, Domovyk, insect replacement, zeroing, slot reorder/pair, potion swap and extension. No page errors.
- Real iPhone Safari has not been tested. A new party is required for the new deck, recipe set and roster.

UI regressions fixed while verifying: contextual buttons no longer become recipe inspection through pointer capture; ingredient drops over recipe-slot targets are redirected to the cauldron; obsolete station DOM is removed when changing rooms; functionally different sealed/boosted cards form distinct stacks.
