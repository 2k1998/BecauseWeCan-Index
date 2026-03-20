# Energy Contract Portal

Static document portal for energy contract files. Built with Next.js + TypeScript + Tailwind. Deployed via GitHub Pages.

## Stack
- **Frontend**: Next.js (App Router, static export)
- **Styling**: Tailwind CSS
- **Storage**: GitHub repo (PDFs in `public/files/`)
- **Hosting**: GitHub Pages

---

## Adding / Updating PDFs

1. Place the PDF in the correct folder under `public/files/`:
   ```
   public/files/{provider}/{energy}/{customer}/{program}/filename.pdf
   ```
2. Add an entry to `public/manifest.json` pointing to that path
3. Commit and push → GitHub Actions auto-deploys

**Example path:**
```
public/files/zenith/revma/oikiaka/kitrina/Power Home Save.pdf
```

**Example manifest entry:**
```json
{ "name": "Power Home Save.pdf", "path": "files/zenith/revma/oikiaka/kitrina/Power Home Save.pdf" }
```

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Build & Export

```bash
npm run build
```

Output goes to `out/`. This is the static site ready for deployment.

---

## Deploy to GitHub Pages

### One-time setup

1. Create a GitHub repo and push this project
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out/
      - uses: actions/deploy-pages@v4
```

4. Push → site goes live at `https://{username}.github.io/{repo-name}/`

### If using a subdirectory URL (not custom domain)

Add to `next.config.ts`:
```ts
basePath: "/{repo-name}",
assetPrefix: "/{repo-name}/",
```

If using a custom domain, leave `basePath` empty.

---

## Manifest Structure

```json
{
  "providers": [
    {
      "slug": "zenith",
      "label": "Ζενίθ",
      "energyTypes": [
        {
          "slug": "revma",
          "label": "Ρεύμα",
          "sharedFiles": [],
          "customerTypes": [
            {
              "slug": "oikiaka",
              "label": "Οικιακά",
              "sharedFiles": [],
              "programs": [
                {
                  "slug": "kitrina",
                  "label": "Κίτρινα",
                  "files": [
                    { "name": "Power Home Save.pdf", "path": "files/zenith/revma/oikiaka/kitrina/Power Home Save.pdf" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
