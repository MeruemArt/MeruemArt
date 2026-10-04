# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served in a deliberate order: **credibility first, conversion second.**

- **Primary — recruiters and talent buyers.** Arrive from LinkedIn, referrals, or search. Need to validate the CV, the trajectory, and the numbers in seconds. The CV and the quantified record do the persuading; the services section is the bridge to a conversation, not the opening argument.
- **Secondary — clients with a live infrastructure need.** Arrive with a concrete problem: pipelines, cloud cost, security posture, multi-region reliability. Need to recognize quickly whether that problem is solvable here, then reach him without friction.

The site serves both audiences from one set of pages. Ordering the page for one audience at the expense of the other is a regression, not a trade-off.

## Product Purpose

A personal site whose job is to convert engineering credibility into conversations. It exists to make Luis Arteaga's DevOps track record legible and verifiable to a stranger who has never heard of him, and to give that stranger a low-friction way to start talking.

Success is a qualified conversation starting — a recruiter advancing to a next step, or a client describing a real infrastructure problem. Page views, download counts, and social impressions are not the measure.

## Positioning

**Banking-sector scale and compliance rigor** is the mechanism a competitor cannot copy truthfully.

The Cobis Topaz / Kratos work carries things a portfolio built on personal projects structurally lacks: banking-grade infrastructure, batch and audit microservices, multi-region architecture with S3 replication and global DynamoDB tables, RPO under one hour, AWS Well-Architected compliance, DeletionProtection on critical instances, and IAM roles tuned against Security Hub findings.

That background is the claim. Tool lists are not. AWS, Python, Azure DevOps and Git appear throughout the site as *evidence attached to that claim*, never as the claim itself.

## Operating Context

- **Deployment:** Netlify, static build. The contact form uses `data-netlify="true"`; Netlify is the only backend dependency and it exists solely to receive that form.
- **Contact:** WhatsApp `+57 318 640 5618` is the **primary** channel, reachable from a floating button on every page, with a script that swaps `web.whatsapp.com` for `api.whatsapp.com` on mobile agents. The Netlify form is the **secondary** channel and must never outshout the WhatsApp path.
- **Editorial workflow:** the `work` Astro content collection (4 entries) plus `mentions` (9 images) and the CV PDF are the editable content surface. The CV is also embedded inline on the home page as a PDF viewer, not just linked.
- **Fonts** are self-hosted `@fontsource` woff2 subsets, preloaded in `MainHead.astro`. No third-party font CDN at runtime.
- **Theme:** light and dark both implemented via CSS custom properties with a `.theme-dark` custom variant; dark is the default. The theme toggle is a first-class control, not a nicety.
- **Language:** Spanish (Colombia) throughout. Audience geography is Bogotá / Montería. There is no English version and none is currently planned.
- **Tone of voice:** professional, technical, and direct, using `tú` in calls to action ("¿Tienes un proyecto en mente?", "Ayudo a empresas a desplegar software más rápido"). Technical vocabulary is never translated or softened.

## Capabilities and Constraints

**Confirmed constraints**

- Static site. No application server, no database, no user accounts. Anything requiring backend state is out of scope for the current architecture.
- Copy is real professional history and must stay truthful. Published figures are load-bearing and must not be inflated, rounded up, or restated without the underlying evidence.
- Third-party marks present in the repo: the Cobis logo (`src/assets/cobis.svg`) and 9 StarMeUp mention screenshots. Their presence is not a statement of endorsement or affiliation by Cobis or StarMeUp.
- `src/content/work/*.md` entries are dated 2019–2023 and describe **competencies and working practice**, not named project case studies. They are not case studies and must not be presented as client work.

**Open decisions — not yet settled**

- **Canonical domain is contradictory.** `astro.config.mjs` sets `site: 'https://meruemart.cloud'`; `public/robots.txt` advertises `https://meruemart.com/sitemap-index.xml`. One is wrong, and the answer governs canonical URLs, OG tags, and the sitemap. Unresolved.
- **Job title is inconsistent across surfaces.** Home renders "Ingeniero DevOps", `/about/` and its metadata say "DevOps Engineer", and `MainHead.astro` still carries starter boilerplate: `title = "Luis Arteaga: Developer"` / `description = "The personal site of Luis Arteaga"`. One title should win sitewide. Unresolved.
- **Accessibility standard is not set.** Contrast revisions landed in 2026 but no target (WCAG level) has been confirmed as a product requirement. Unresolved.
- **No English version is planned** for now; whether one is ever wanted is undecided.

## Brand Commitments

- **Name:** Luis Arteaga. Full legal name per the CV asset: Luis Carlos Arteaga Espitia.
- **Handle:** `MeruemArt` — GitHub at `github.com/MeruemArt`, and the wordmark component `MeruemLogo`. The domain derives from it. Binding: the handle is part of the identity, not decoration.
- **LinkedIn:** `linkedin.com/in/luis-arteaga-07/`. Treated as a primary professional channel.
- **Language and register:** Colombian Spanish, professional and plain. No anglophone idioms, no translated jargon. Every call to action addresses the visitor as `tú`.
- **Confirmed assets — reuse, do not regenerate:** `portrait.webp` (headshot, used in hero and OG), `at-work.jpg` (about hero), `cobis.svg`, `whatsapp-icon.svg`, `numbers-pattern.avif`, `og-image.png`, `64x128` app icons, the CV PDF, and `mentions/starmeup-1..9.png`.

## Evidence on Hand

Real, existing, on disk:

- **CV PDF** — `public/assets/Luis_Carlos_Arteaga_Espitia_CV.pdf`. Linked and embedded in a viewer on the home page.
- **Quantified results**, already published in `/about/`: 10+ critical AWS Security Hub vulnerabilities resolved and a 40% posture improvement; USD 800/month saved by optimizing a CloudFormation parent template; 25% compute cost reduction; 30+ redundant resources eliminated; 50+ templates standardized with 200+ lines of duplication removed and 35% maintainability gain; unit-test coverage raised from 0% to 85% on critical Python Lambdas; 15+ unit tests; RPO under 1 hour via multi-region S3 and global DynamoDB; 12 PowerShell scripts automating the Azure DevOps Work Item lifecycle; 3 parameterized CI/CD templates; Quality Gates at 3 levels.
- **9 StarMeUp mention screenshots** — `public/assets/mentions/starmeup-1..9.png`.
- **Employment history** with dates, titles, companies and cities on `/about/`.

**Known absences — future work must not fabricate any of these:**

- No named testimonials. The mention screenshots carry only the generic alt text `Reconocimiento`; no attribution, no source, no date, no quote is captured anywhere.
- No client list, no logos beyond Cobis, no engagement or project names.
- No certifications, courses, publications, or conference talks.
- No performance or traffic data of any kind.
- No pricing, engagement model, availability dates, or capacity statements.

## Product Principles

1. **Credibility precedes conversion.** The CV and the verifiable record carry the page. Services are the bridge to a conversation, never the opening argument. A visitor should be able to read the evidence before ever meeting a sales surface.
2. **Evidence over adjectives.** Every claim ships with a number or a named system. "Reduced costs by 40%", not "cost optimization expert". A claim that cannot carry evidence does not belong on the site.
3. **Banking-grade rigor is the wedge.** Multi-region, compliance, and reliability language outranks tool inventory. Depth in one domain is a position; a list of technologies is not.
4. **One conversation, minimal friction.** WhatsApp is the primary path to a human. The form exists as a fallback and must stay visually subordinate to it.
5. **Truth is the brand.** The site's value is that its numbers are real and its history is checkable. Any copy, claim, or asset that cannot be defended to an employer is a defect, regardless of how well it converts.

## Accessibility & Inclusion

No product-specific requirement has been established yet. See Open decisions in *Capabilities and Constraints* — the accessibility standard is unresolved and needs to be confirmed before it can be treated as binding.