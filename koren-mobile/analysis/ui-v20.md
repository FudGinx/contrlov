# Table readability - v20

Brewed ingredients and attached sabotage keep their original insertion order. Identical cards are grouped only in the hand (which retains the server's colour sort). Each brew unit represents one physical own ingredient, so targeting cannot silently select another identical ingredient.

Mouse hover opens an ingredient and all attached sabotage into fully separated cards directly in the current grid. Touch tap opens the same view; another tap inspects an individual card. Counts distinguish one ingredient from its sabotage. Cancelled sabotage stays visible and cards stay opaque. Leaving the stack, tapping elsewhere, Escape, state render and window blur restore the original layout. Existing white-card drag targeting is retained.

Ordinary table orders grow with their contents, with a compact two-column requirement list and readable labels. All five requirements, or six after Blud, remain in the card. Hand order icons and enlarged inspections keep their existing presentation.

Own-turn hand availability now uses the final playable predicate (including character payment/ward rules). Unavailable cards get brightness .78 and saturation .85, with opacity 1, and remain inspectable and draggable to other legal destinations. Existing available-card glow remains.

Validation: frontend scripts parse together; scripts/check-table-v20.mjs exercises original brew order with duplicates, separate identical sabotage targets, hand stacking, five/six recipe requirements, inline fan physical contents/spacing/restore, and own-turn availability changes. The build imports this check so publication executes it on the actual source in Node. Browser/device QA is unavailable this turn because the execution environment disconnected; mock DOM checks do not establish pixel layout or native pointer behaviour.
