### QUALITY OF LIFE:

Improve tooltip for chi display
Make upgrade bar dynamically change width to the width of the text above it.

### FURTHER CONTENT:

Create elemental aspect (Foundation 1)
Create combat (Foundation 2)

### FOR CLAUDE:

Some bugs have come up as a result of the new React rendering system we have. Work from the top down. Solve one issue at a time, then stop.

The Advance button is greyed out at max chi. (I suspect it is not registering how much chi is available. This may fix the upgrade problem too.)
Chi still updates, but XP does not.
Upgrades cannot be purchased, the option is greyed out. (I suspect the upgrades are not registering how much chi is available)
When importing a save, upgrades from above Chi Gathering 2 are not unlocked. (I suspect this is only checked on advancement, since before loads, this was sufficient)
Chi does not take into account any upgrades except for advancement level. I leave this for last since this may only be a save problem, and I can check for this after the Advance button is fixed.

