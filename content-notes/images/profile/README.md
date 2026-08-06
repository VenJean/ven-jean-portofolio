Referenced from `src/components/sections/HeroPortrait.tsx`:

- `portrait.png`

This is a code-only feature — the glow, floating entrance, hover scale, and
mouse-parallax are all implemented and ready. Until this file exists, the
Hero falls back to a plain placeholder tile (visible, not broken).

The photo itself needs to already be edited before it's dropped in here —
none of the following can be done with CSS on an arbitrary photo:

- **Transparent PNG**, background fully removed
- **Half-body** crop, professional posture
- **Looking slightly to the left** (toward the text column)
- **Soft blue rim light** baked into the photo/retouch (the code adds a soft
  blue glow *behind* the portrait, but the rim-light-on-the-subject itself
  has to come from the source photo or a retouch pass)

Recommended source resolution: at least 1000px tall so it stays sharp at the
`lg:max-w-sm` display size.
