# Todo — things only you can do

Everything here needs a file, a fact or a decision I don't have.
Delete lines as you go.

## Done since the last pass

- [x] New portrait — in place. The hero frame is now square rather than 4:5,
      because the file is 685 × 623 and the taller frame was cropping your head.
- [x] Neural Computation cover — wired into `_projects/net-fragments.md`. Project
      heroes are now height-capped and centred on a panel, so a portrait-format
      cover shows whole instead of being cropped to a band.
- [x] BibTeX — all eleven entries replaced with your Zotero export, verbatim.
- [x] COGITAO thesis title corrected in `_data/teaching.yml`.
- [x] PDFs — seven of eleven papers now have a working PDF link.

## 1. Still needs you

- [ ] **Check the Binabik paragraph in `index.html`** ("What I'm doing now").
      Written from the technology whitepaper, which is marked confidential. The
      raise, valuation, revenue, unit economics and the named channel partner
      are all deliberately absent — but read it once with an investor's eyes
      before this is public.

- [ ] **Two papers still have no PDF**, both paywalled IEEE:
      - Hounsfield Unit Ranges (SDS 2025)
      - A Survey of Un-, Weakly-, and Semi-Supervised Learning (SDS 2021)

      Both have accepted-manuscript files in your Zotero (the export references
      a "Submitted Version" for the 2021 one). If the agreements allow it, drop
      them in `assets/papers/` and add `pdf: /assets/papers/<name>.pdf` to the
      entry in `_data/publications.yml`. ZHAW's digital collection is the other
      route — that's how the Efficient GPTs PDF is served.

- [ ] **`So You Want Your Private LLM at Home?`** — your Zotero entry is the ZHAW
      repository record (DOI `10.21256/ZHAW-30279`) and has no page numbers. The
      old site claimed pp. 205–212 at IEEE SDS 2024. I dropped the page range
      rather than assert it. Add it back to `_data/publications.yml` if you can
      confirm it.

## 2. Facts to confirm

- [ ] **CHF 420k.** 200k fellowship + 220k project money. ZHAW lists the DIZH
      fellowship you lead at CHF 198'500, so check the rounding reads how you
      want. `data-count="420"` in `index.html`.
- [ ] **Thesis years** are still off — I left them out rather than guessing.
      Add `year:` to any entry in `_data/teaching.yml` and I'll render them.
- [ ] **Google Analytics** is still `G-8Q85YDEXXY`
      (`_includes/analytics.html`, production builds only).

## 3. Before you publish

- [ ] `bundle install` — I added `webrick` to the Gemfile, so the committed
      `Gemfile.lock` is stale. Run it, then commit the refreshed lock.
- [ ] Review the diff. It is large: the old site vendored four copies of Font
      Awesome, so the deletion count runs to seven figures.
- [ ] Deploy from `master`, then check `/blog/` redirects rather than 404s —
      old links point there and GitHub Pages can't issue a real 301, so it's a
      meta refresh.
- [ ] Submit `https://sagerpascal.github.io/sitemap.xml` to Search Console.
- [ ] If you move to a custom domain, add a `CNAME` and update `url:` in
      `_config.yml` — canonicals, Open Graph URLs and the sitemap all derive
      from it.

## 4. Optional

- [ ] **Accent colour.** Signal orange `#FF4D00`. Binabik's brand red is
      `#DB2424`. Unifying them is two lines in `_sass/_tokens.scss`
      (`--accent`, `--accent-deep`).
- [ ] **Old project images.** About twenty files under `assets/images/` belonged
      to the retired projects and are now unused (~20 MB). Left in place in case
      you want any back.
- [ ] **`_old_posts/`** — nine unpublished drafts, excluded from the build.
