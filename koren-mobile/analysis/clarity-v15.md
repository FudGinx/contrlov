# Table clarity, landing feedback and Znakhar — v15

Cancelled sabotage cards remain fully opaque and carry a cancellation stamp. Unavailable drop targets use brightness and saturation rather than transparency.

Dragging a ward or distillation over a grouped brewing stack fans that stack in place. The recipe, table grid and surrounding station remain in the same DOM. Exposed targets have 48px touch strips (36px with a mouse); dragging near the grid edge pans horizontally. Releasing or leaving the stack restores its original layout. Mosskeeper uses the same targeting behavior.

Category landing effects now have a large primary symbol, visible secondary particles and longer timing: jumping mushrooms, burying roots, circling insects and pouring liquids. A captured landing point lets feedback finish when a potion closes before the delayed effect. Reduced-motion settings receive a visible static flash.

Znakhar no longer receives an unconditional or manually activated continuation. Once per own turn, adding a printed liquid immediately after the previous active own insect ingredient grants one extra ingredient permission. Sabotage and neutral essences do not activate it. A previous turn's insect can prepare the sequence.

Validation:

- Build and all 65 automated tests passed.
- 450 complete bot matches retained the physical 80-card count after every action and terminated successfully (selected-character-stress.json).
- Chrome mouse test at 844×390 and touch test at 667×250 verified in-place fanning, retained recipe/grid nodes, opaque cancelled cards, exact ward/distillation targets, four category effects, fast-completion feedback and reduced-motion feedback; no page errors.
- Browser emulation covers touch interaction and short viewports; it is not a physical iPhone Safari test.
