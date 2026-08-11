# sagerpascal.github.io

Personal site of [Pascal Sager](https://sagerpascal.github.io) — co-founder and CTO at
Binabik AI, PhD candidate in AI at ZHAW and the ETH AI Center. Built with
[Jekyll](https://jekyllrb.com); no framework, no build step beyond Jekyll itself.

## Running locally

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open [http://localhost:4000](http://localhost:4000).

## Editing content

Almost everything on the landing page is data, not markup — edit the YAML, not the HTML.

| File | Controls |
| --- | --- |
| `_data/research.yml` | The four research threads |
| `_data/publications.yml` | Selected papers. `me` is the author string that gets bolded |
| `_data/experience.yml` | Roles. `icon` names a glyph in `icons.yml`; `current: true` accents the marker |
| `_data/outreach.yml` | Talks and press |
| `_data/navigation.yml` | Nav links |
| `_data/social.yml` | Social icons in the footer |
| `_data/icons.yml` | Every inline SVG icon |
| `_projects/*.md` | One file per project page, published at `/work/<filename>/` |

The prose in the hero and the "what I'm doing now" section lives in `index.html`.

## Structure

| Path | Contents |
| --- | --- |
| `_layouts/` | `base` wraps everything; `home`, `project`, `post`, `error` extend it |
| `_includes/` | `base-head`, `navbar`, `footer`, `icon` |
| `_sass/` | `tokens` → `base` → `chrome` → `home` → `article`, each imported once |
| `assets/js/` | `theme-init.js` (blocking, in `<head>`), `site.js` (everything else) |
| `_posts/` | Three archived posts, kept online for their inbound links. `_old_posts/` is unpublished |

### Theming

Every colour is a CSS custom property in `_sass/_tokens.scss`, with a `[data-theme="light"]`
override. Changing the brand accent is a two-line edit:

```scss
--accent: #c8ff5e;       // the fill — always paired with --on-accent text
--accent-text: #c8ff5e;  // the readable-as-text version for this theme
```

### Icons

Inline SVGs, rendered by `_includes/icon.html`:

```liquid
{% include icon.html name="robot" label="Robotics" class="icon-lg" %}
```

Add one by dropping its `viewBox` and body into `_data/icons.yml`. Set `stroke: true` for
line glyphs. The three brand marks come from Font Awesome Free under
[CC BY 4.0](https://fontawesome.com/license/free).

## Fonts

Instrument Serif (display) and JetBrains Mono (labels) from Google Fonts; Switzer (body)
from Fontshare.
