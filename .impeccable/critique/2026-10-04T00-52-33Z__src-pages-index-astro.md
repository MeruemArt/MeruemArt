---
target: la pagina de inicio (src/pages/index.astro)
total_score: 15
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
target_identity: "file:/home/meruemart/Proyectos/MeruemArt/src/pages/index.astro"
target_fingerprint: "sha256:9269bc76a7ead100cc03e3827a5980dccbb48d7a2cef2928191d3d26e917de0d"
target_path: /home/meruemart/Proyectos/MeruemArt/src/pages/index.astro
timestamp: 2026-10-04T00-52-33Z
slug: src-pages-index-astro
---
Method: dual-agent (A: ses_efbaf3b97ffebTyP85ChM4NgbL · B: ses_efbaf00cbffeAe4Mzo1f0ab7IO)

## Design Health Score
Mode: Experience (portfolio). H7 and H10 scored n/a -> applicable max 32.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Header only opacifies past scrollY>80; form has no success state |
| 2 | Match System / Real World | 2 | Three cities (Bogota/Medellin/Monteria), three titles, voseo vs committed tu |
| 3 | User Control and Freedom | 2 | 4 "Trabajo" rows hover with no destination; /work/ from the 404 page 404s |
| 4 | Consistency and Standards | 2 | Six measures; ::selection hardcodes #fff; mobile active nav 3.70:1 |
| 5 | Error Prevention | 2 | required+autocomplete correct; no form-name, honeypot, or success state |
| 6 | Recognition Rather Than Recall | 2 | The CV is a 15.2px link; / carries zero quantified results |
| 7 | Flexibility and Efficiency | n/a | No repeat tasks, no power user on a portfolio surface |
| 8 | Aesthetic and Minimalist Design | 1 | 12-chip tool wall + snow + blurred violet blobs + 4 exits per decision |
| 9 | Error Recovery | 2 | 404 uses .rail-label/.rail-value, classes absent from every stylesheet |
| 10 | Help and Documentation | n/a | Nothing to document without fabricating an FAQ |
| **Total** | | **15/32** | Poor (47%) |

## Design Specificity Verdict
The typographic system is authored (two warm serifs + Public Sans for labels). The page is
a template. SnowEffect.astro (z-index 9999, color white, 1.06:1 in light - invisible and still
painting) and BackgroundPattern.astro:190-232 (four blur(40px) violet ellipses at opacity 0.5)
contradict DESIGN.md: "El violeta deja de ser el color de las superficies: es senal, no ambiente."
Swap in a photographer and snow plus pattern survive.

Deterministic scan: exit 0, 11 findings, all advisory. 8x design-system-font-size with ZERO false
positives (all 8 verified in-browser: 96px, 36px, 30.4px, 18.4px, 14.8px x2, 14.4px, 14px).
3x design-system-color, all FALSE POSITIVES - hue-less black alpha used for shadow/scrim, which the
rule does not govern. Detector blind spot: src/styles/*.css was out of scope, so shell.css:248
(14.4px) and :298/:306 (13.6px) are unreported - the count of 11 under-reports.

No visual overlay: no native browser tool in this harness; all measurement headless via CDP.

## Overall Impression
The peak is right: 88px Fraunces h1 on charcoal. The end is broken. The last thing on every page is
ContactCTA, whose h2 renders 30.4px/700 - above every .block-title (30.24px/600) - with a
.submit-btn identical to the WhatsApp pill 1rem above. The visitor who wanted a person gets a form.

## What's Working
1. --color-on-accent discipline: flips to #17130f in dark for 8.33:1. Buttons use the token, not a
   hardcoded #fff. Pixel-verified 5.22-7.93:1.
2. Rejecting the tinted active-nav background in favour of an underline, with the reasoning
   written down. Holds 6.67:1 dark / 6.33:1 light.
3. text-wrap: pretty with max-width: var(--measure). Measured exactly: 594px = 66.0ch.

## Priority Issues

### [P0] "Trabajo" presents four recognitions as client work
work/{contributions,research,customer-service,teamwork}.md titled Contribucion / Investigacion /
Atencion al cliente / Trabajo en equipo, img: starmeup-N.png, under <h2>Trabajo</h2> with a year.
PRODUCT.md: "no son case studies y no deben presentarse como trabajo de cliente." All four ship an
empty description: -> <meta name="description" content=""> and an empty .hero-lede. Read as four
banking projects 2019-2023 they contradict /about/ (Mar 2022 - Mar 2026). A recruiter concludes the
career stopped in 2023.
Fix: delete the "Trabajo" block from /, fold the recognitions into "Menciones", write real
descriptions.
Command: /impeccable distill

### [P0] The contact handoff is broken on four axes
PRODUCT.md Principle 4: WhatsApp is primary and must stay visually subordinate to the form. Today
.submit-btn and .btn-primary are the same var(--gradient-accent) pill 1rem apart. Also
.form-input { outline: none } kills the global :focus-visible, and field borders sit at 1.29:1
against their own background (WCAG 1.4.11 needs 3:1). No success state - submit lands on Netlify's
unstyled page.
Fix: real asymmetric hierarchy - dominant WhatsApp, form collapsed behind a link; restore focus
ring; field border >=3:1.
Command: /impeccable distill

### [P1] The type ramp collapsed - hierarchy is illegible
DESIGN.md documents 5 steps. The page renders 15 distinct values: 88 / 30.4 / 30.24 / 20.8 / 19.2 /
18.4 / 18 / 16.32 / 16 / 15.2 / 14.8 / 14.4 / 14 / 13.6 / 11.52 / 10.88.
.row-title 19.2px vs .row-detail 16.32px = ratio 1.18, and shell.css:228 literally says "si ambos
rondan 1rem no hay jerarquia, hay una lista de parrafos del mismo peso" - the comment describes the
values the code ships. .hero-lede 20.8 -> .row-title 19.2 is 1.08x. .fact dt is 10.88px, below the
11.52 floor of .row-mark: the smallest text on the page is metadata, not content.
.contact-title (30.4/700) out-ranks .block-title (30.24/600) - the last block is the loudest heading
on the page. The CV, which PRODUCT.md defines as the artifact a recruiter validates "in seconds", is
a 15.2px .rail-link while the 12 Stack chips occupy twice its area.
Fix: a real 6-step ramp and enforce it; .row-title/.row-detail >= 1.35x; .contact-title down to the
section step; CV up to .row-title size.
Command: /impeccable typeset

### [P1] The grid has four left edges and a dead column
DESIGN.md claims "81px y 457px, sin excepcion". Measured: 88px and 464px - the doc is stale by +7px
on both. The structural part holds: portrait, 7 .block-title, 11 .row and footer text sit on exactly
two content edges. But four elements fall outside:
  534.69px - .contact-form, .submit-btn - all 4 pages. section.contact-section is neither .hero nor
             .block, so the grid never applies.
  517.33 / 946.66px - ul.mentions > li - /mentions/ - own 3 x 405px grid, full bleed at 88px.
  88px - /work/* prose - h1 and .work-image at 1264px, .work-body at 487px -> 777px of emptiness.
Dead gutter: content column is 888px, .row-detail caps at 594px -> 348px permanently empty to the
right of every prose row.
Fix: put ContactCTA inside a .block with a .block-title so it inherits the 464px column; align
/mentions/ and /work/*; decide whether the 348px is deliberate editorial air or the 66ch rule applied
without checking the column.
Command: /impeccable layout

### [P1] No spacing scale - the rhythm is accidental
clamp(4rem, 7vw, 6.5rem) between blocks, but 24 distinct spacing literals (0.3, 0.4, 0.45, 0.5, 0.55,
0.6, 0.7, 0.75, 0.85, 0.875, 0.9, 1, 1.1, 1.25, 1.5, 1.6, 1.75, 1.9, 2, 2.5, 3.5, 4, 4.5, 7rem),
zero on a base unit. --section and --row are declared in DESIGN.md's frontmatter and exist in NO
stylesheet: shell.css:98 and :205 hardcode the literals.
Fix: a 6-step token scale; replace the literals so rhythm becomes derivable.
Command: /impeccable layout

### Also confirmed, no dedicated slot
- 6 contrast failures, all the mobile drawer active item: 4.09:1 light / 3.70:1 dark
  (Nav.astro:357-360). Desktop underline passes.
- ::selection hardcodes #fff = 2.82:1 in dark (global.css:127-130).
- ThemeToggle.astro:50 .icon.light::before = 2.22-2.82:1.
- .status "Disponible para proyectos" is a capacity claim PRODUCT.md forbids.
- /work/ is a collection with no index page and not one link anywhere reaching it.
- SnowEffect + BackgroundPattern contradict the stated system.
- about.astro:150 has a second unopened </style>.
- mentions.astro:14 and :37 contain broken Spanish.
- index.astro:187 "Si preferis el correo" - there is no email channel.
- index.astro:147 .row-tags renders "Development Batch Kratos" with no separator.
- robots.txt advertises meruemart.com; astro.config.mjs sets meruemart.cloud.
- /mentions/ requests 9 raw PNGs (468KB); Astro emits webp for only 4, unused.
- .mentions-text 52ch and .work-body p 58ch never reach the declared 66ch.

## Measured Evidence
- Overflow: 0px at 320/375/414/768/1024/1280/1440/1920 across /, /about/, /mentions/,
  /work/teamwork/. 32/32 clean. No element wider than the viewport at any width.
- Contrast: 386 checks (177 light + 177 dark + 32 on /404.html), 380 pass, 6 fail. Light min 4.09,
  median 7.70, max 15.42. Dark min 3.70, median 8.62, max 16.58.
- Line length: 47-76 chars on complete lines at 1440 (the 41-79 band holds). No block exceeds 66ch.
- Fonts: 4 woff2 fetched, all HTTP 200, 228,528 B total. Fraunces Variable, Newsreader Variable and
  Public Sans all resolve, including latin-ext accents. document.fonts.status = loaded, 12 faces.
- Network: 48 responses across the four pages, 0 failures, 0 console errors, 0 exceptions.
- DESIGN.md drift: claims 81px/457px (actual 88/464), "122 contrast checks, 0 failing" (actual 386
  with 6 failing), rowTitle lineHeight 1.3 (actual 1.08), body lineHeight 1.65 (actual 1.6 on body,
  1.65 on .row-detail, 1.75 on .work-body p).

## Persona Red Flags
Jordan (confused first-timer): cannot answer where does he work now, how long, what has he shipped.
The first screen offers only "Ayudo a empresas a desplegar software mas rapido" - no employer, no
tenure, no number. Those exist only on /about/, two clicks away. The nav's second item is Menciones,
the weakest evidence on the site, and there is no CV item.
Riley (stress tester): hovers all 4 "Trabajo" rows - background changes, nothing navigates
(shell.css:214 on elements without href). Tries /work/ from the 404 -> 404. Opens any work page ->
empty meta description, empty lede. Submits the form -> no success state, and .form-input
{ outline: none } kills the focus ring.
Casey (distracted mobile): below 64em the blocks stack and .hero-figure { max-width: 15rem } sits
AFTER .hero-text in DOM order - the portrait is entirely below the fold. First screen: logo, 3
links, name, 17.6px lede, 52px FAB. No CV, no number, no inline WhatsApp. The FAB is z-index 100
while .mobile-menu-overlay is 9998 - the primary channel is the first thing the menu hides.
