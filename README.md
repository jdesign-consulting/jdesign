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
3. The site is published at `https://jdesign-consulting.github.io/jdesign/`.

### Custom domain (optional)

1. In **Settings → Pages → Custom domain**, enter your domain (for example `jdesign.co.uk`) and save.
2. At your domain registrar, add the DNS records GitHub shows you (four `A` records for an apex domain, or a `CNAME` to `jdesign-consulting.github.io` for `www`).
3. Tick **Enforce HTTPS** once the certificate is issued.
4. Update the absolute URLs in `site/index.html` (`og:url`, `og:image` and the JSON-LD `url`) to the new domain.

## Before promoting the site

- [ ] **Contact form:** create a free form at [formspree.io](https://formspree.io) and replace `YOUR_FORM_ID` in `site/index.html`. Until then the form tells visitors it isn't connected yet.
- [ ] Read through the copy (especially the FAQ and "Why jdesign" sections) and adjust any promises so they match how you work.
- [ ] Optionally add a direct email address or phone number to the contact section and footer.

## Adding a new portfolio project

Copy the `<article class="case">` block in the `#work` section, swap in a screenshot (around 1440×900, saved as `.webp` in `site/assets/img/`), and update the text, tags and link.
