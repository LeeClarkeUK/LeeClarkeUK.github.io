# Portfolio V1 Design System

## Brand Direction
- Archetype: Playable Engineer
- Tone: Calm, precise, inventive
- Goals:
  - Show technical breadth (games + web apps)
  - Keep interface simple and scannable
  - Add one memorable interactive moment

## Visual Language
- Style: Minimal core layout with a kinetic accent
- Contrast strategy: Deep surface colors with bright accent cues
- Shape language: Rounded rectangles, soft glows, subtle grid texture

## Color Tokens
```css
:root {
  --bg: #071018;
  --surface: #0f1b27;
  --surface-2: #132434;
  --text: #eaf3ff;
  --muted: #9bb1c8;
  --accent: #3dd6c6;
  --accent-2: #ff7a4d;
  --line: #243649;
  --ok: #67e08a;
}
```

## Typography
- Display: Sora (700-800)
- UI/Text: Space Grotesk (400-700)
- Scale:
  - H1: clamp(2.2rem, 5vw, 4.2rem)
  - H2: clamp(1.6rem, 3vw, 2.4rem)
  - Body: 1rem
  - Meta/Captions: 0.875rem

## Spacing + Layout
- Container max width: 1120px
- Section rhythm: 88px desktop / 64px mobile
- Base spacing unit: 8px
- Grid:
  - Desktop: 12 columns
  - Tablet: 8 columns
  - Mobile: single-column stack

## Component Rules
- Top nav:
  - Sticky with blur backdrop
  - 4-5 anchor links max
- Hero:
  - Two-column layout on desktop
  - Left: positioning statement + CTA
  - Right: interactive canvas module
- Project cards:
  - Title, role, stack, outcome
  - 2-3 links max (Demo, Repo, Case Study)
- Skill pills:
  - Group by domain (Game, Frontend, Backend, Tooling)
- Contact card:
  - Email CTA + social links

## Motion
- Page intro: 300-500ms fade/translate in
- Reveal on scroll: 400ms staggered up motion
- Hero interactive: pointer-reactive particles
- Respect reduced motion preference by disabling transforms/particles

## Content Rules
- Keep sections concise and proof-oriented
- Every project must include:
  - Problem
  - Your contribution
  - Measurable result or lesson
- Prioritize 3 flagship projects over long lists
