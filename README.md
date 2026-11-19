# jdesign.

Landing page for jdesign: websites for trades, labouring firms, consultancies and other small businesses.

A plain static site (HTML, CSS and a little JavaScript) with no build step, deployed to GitHub Pages by GitHub Actions.

```
site/
  index.html            the landing page
  assets/css/styles.css styles (brand colours and fonts are at the top in :root)
  assets/js/main.js     mobile menu, scroll reveals, contact form handling
  assets/img/           favicon, social share image, portfolio screenshots
.github/workflows/ci.yml       validates the HTML and checks for missing files on every push
.github/workflows/deploy.yml   runs CI, then publishes site/ to GitHub Pages
scripts/check-assets.mjs       the missing-file check used by CI
```

## Preview locally

```bash
python3 -m http.server 8000 -d site
```

Then open http://localhost:8000.

## Deploying to GitHub Pages (one-off setup)

1. In the repo on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Make sure the code is on the `main` branch. Every push to `main` deploys automatically, and you can also run the workflow by hand from the **Actions** tab ("Deploy site to GitHub Pages" → "Run workflow").
3. The site is published at https://jdesign.live (and at `https://jdesign-consulting.github.io/jdesign/` until the custom domain is set).

### Custom domain: jdesign.live

The domain is set in **Settings → Pages → Custom domain** (a `CNAME` file is not used with Actions deploys). DNS records at the registrar:

| Type  | Host / Name | Value |
|-------|-------------|-------|
| A     | `@` | `185.199.108.153` |
| A     | `@` | `185.199.109.153` |
| A     | `@` | `185.199.110.153` |
| A     | `@` | `185.199.111.153` |
| AAAA  | `@` | `2606:50c0:8000::153` |
| AAAA  | `@` | `2606:50c0:8001::153` |
| AAAA  | `@` | `2606:50c0:8002::153` |
| AAAA  | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `jdesign-consulting.github.io` |

Once DNS resolves, tick **Enforce HTTPS** in the Pages settings. If the domain ever changes, update the absolute URLs in `site/index.html` (`og:url`, `og:image` and the JSON-LD `url`).

## Before promoting the site

- [ ] **Contact form:** create a free form at [formspree.io](https://formspree.io) and replace `YOUR_FORM_ID` in `site/index.html`. Until then the form tells visitors it isn't connected yet.
- [ ] Read through the copy (especially the FAQ and "Why jdesign" sections) and adjust any promises so they match how you work.
- [ ] Optionally add a direct email address or phone number to the contact section and footer.

## Adding a new portfolio project

Copy the `<article class="case">` block in the `#work` section, swap in a screenshot (around 1440×900, saved as `.webp` in `site/assets/img/`), and update the text, tags and link.
