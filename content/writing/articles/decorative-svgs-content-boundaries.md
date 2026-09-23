---
title: "Why I Stopped Treating Decorative SVGs Like Wallpaper"
date: "2026-08-18"
lastModified: "2026-09-24"
excerpt: "A single background SVG looked fine on a laptop and fell apart on an ultrawide monitor. I rebuilt it as four content-aware margin illustrations."
published: true
tags: ["frontend", "svg", "responsive-design", "nextjs"]
---

*September 24, 2026 update: this post documents an earlier design iteration. The current site uses decorative side rails that scroll with the content and place birds at regular vertical intervals. The fixed layer and four-bird layout below describe the earlier version.*

My portfolio has birds in it. A lot of them.

The first version put ten bird drawings into one 1127 by 528 SVG and used that file as a fixed background layer:

```tsx
<div
  className="fixed inset-0 hidden lg:block"
  style={{
    backgroundImage: 'url("/untitled.svg")',
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: 0.25,
  }}
/>
```

It looked fine at the screen size I happened to be using. On an ultrawide monitor, it looked like bird wallpaper.

That exposed the actual bug: the illustration knew the viewport size, but it knew nothing about the content.

## Two coordinate systems

The page content has a maximum width. The background SVG did not. It scaled against the full browser window while the text stayed in a centered column.

As the viewport grew, the empty margins grew too. `background-size: contain` kept the whole composite visible, so more of its drawings appeared around every section. The same fixed arrangement also stayed behind the page while scrolling. A choice that felt restrained on a laptop became much louder at 2560 pixels wide.

I still wanted the birds. They give the site some personality, and deleting them would have solved the wrong problem.

The useful constraints were:

- Keep the illustrations outside the reading column.
- Show them only when the viewport has enough spare room.
- Keep them quiet in every color theme.
- Do not animate them or let them catch pointer events.

## One layer, four independent birds

I replaced the composite SVG with four of its original drawings. At that stage, each bird was an independent image inside the same fixed decorative layer.

```tsx
const marginBirds = [
  {
    src: "/bird-svgrepo-com (1).svg",
    className: "left-[max(3rem,calc(50%-46rem))] top-[18%] w-32",
  },
  {
    src: "/bird-svgrepo-com (6).svg",
    className: "right-[max(3rem,calc(50%-46rem))] top-[26%] w-32",
  },
];
```

The horizontal position does most of the work.

`50%` finds the center of the viewport. Subtracting `46rem` moves the image into the left margin relative to that center, so the bird tracks the content column instead of the browser edge. The right side uses the same calculation in reverse.

`max(3rem, ...)` is the guardrail. If the available margin shrinks, the illustration never gets pushed flush against the edge.

The whole layer stays hidden below 1720 pixels:

```tsx
<div className="fixed inset-0 hidden opacity-[0.13] min-[1720px]:block">
  {marginBirds.map((bird) => (
    <img
      key={bird.src}
      src={bird.src}
      alt=""
      className={`absolute h-auto ${bird.className}`}
    />
  ))}
</div>
```

Below that breakpoint, there is not enough empty space for the decoration to earn its place. Hiding it is simpler and safer than squeezing it around the content.

## Theme handling stayed boring

The old layer already had one useful property: every color theme could treat the decoration as a single visual unit. I kept that boundary.

The wrapper still carries the `decorative-svg` class, so dark themes can invert the line art once at the parent level. The opacity dropped from `0.25` to `0.13`. The birds are visible if you notice them, but they no longer compete with project titles or screenshots.

The wrapper also keeps `pointer-events: none`, `user-select: none`, and `aria-hidden="true"`. These images do not explain anything. They should not enter the tab order, the accessibility tree, or the interaction model.

## How I checked it

I checked the page at three sizes:

| Viewport | Expected result |
| --- | --- |
| 2560 by 1440 | Four birds visible in the outer margins |
| 1440 by 900 | Decorative layer hidden |
| 390 by 844 | Decorative layer hidden and project cards stacked |

The browser check also read each bird's bounding rectangle. At 2560 pixels wide, all four had a nonzero width and stayed outside the main content column. At the two smaller sizes, every decorative image measured zero because the parent layer was hidden.

I captured each viewport and inspected the screenshots as well. Geometry can prove that an image is outside a column. It cannot prove that the page feels calm.

No console errors or hydration errors appeared during the three runs.

## What I would reuse

A decorative background is fine when the artwork belongs to the viewport. These birds belong to the margins around a fixed-width article, so their positions need to share that article's coordinate system.

The reusable part is the rule, not the bird array: anchor decoration to the thing it frames, add a breakpoint where the available space becomes real, and verify the result at the awkward sizes instead of only the size sitting on your desk.
