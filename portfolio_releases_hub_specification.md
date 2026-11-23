# Project Specification: Developer Portfolio & Automated LTS Releases Hub

> **Instructions for the AI Agent:**
> You have access to my GitHub account and repositories. Use this document as the single source of truth to design, build, and configure a modern, responsive static **Portfolio & Releases Hub** website deployed on **GitHub Pages**.
> Inspect my GitHub profile, pinned/public repositories, and existing releases to populate the initial content automatically.

---

## 1. Official Documentation & References

All integrations and deployment pipelines **must** adhere to the official GitHub documentation:

- **GitHub Pages Documentation:** https://docs.github.com/en/pages
- **Publishing with Custom GitHub Actions Workflow:** https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- **GitHub REST API — Releases:** https://docs.github.com/en/rest/releases/releases
- **GitHub REST API — Repositories:** https://docs.github.com/en/rest/repos/repos
- **GitHub REST API — Rate Limits:** https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api

---

## 2. Core Objectives & Features

### A. Portfolio Showcase (نمونه کارها)
1. **Hero & Bio Section:** Extract name, avatar, bio, and social links from my GitHub profile.
2. **Skills & Tech Stack:** Infer primary languages and frameworks from my repositories.
3. **Projects Grid:**
   - Display featured projects with title, description, tech stack tags, repository link, and live demo link (if available).
   - Support filtering by category or technology.

### B. Automated LTS Releases Hub (مرکز دانلود نسخه‌های LTS)
1. **Zero-Maintenance Updates:** The website must **never** require manual edits when a new release is published in my application repositories.
2. **Release Filtering:**
   - Ignore `draft: true` and `prerelease: true`.
   - Prioritize the latest stable/LTS release (either via `/releases/latest` or filtering `/releases` for tags/names containing `lts` or latest semantic version).
3. **Download Cards:**
   - Display Version (`tag_name`), Release Title (`name`), and Release Date (`published_at`).
   - Render Markdown release notes (`body`) safely into HTML (using a lightweight parser like `marked` + `DOMPurify`).
   - List all attached `assets` with direct download links (`browser_download_url`), human-readable file sizes (convert `size` from bytes to MB/KB), download counts (`download_count`), and OS/format icons based on file extension (e.g., `.deb`, `.AppImage`, `.exe`, `.dmg`, `.apk`, `.zip`).

---

## 3. GitHub REST API Integration Specification

### Required Headers
All requests to the GitHub REST API must include the official versioned headers:
```http
Accept: application/vnd.github+json
X-GitHub-Api-Version: 2022-11-28
```

### Endpoints to Use
1. **Get Latest Stable Release:**
   ```http
   GET https://api.github.com/repos/{owner}/{repo}/releases/latest
   ```
2. **List All Releases (needed if filtering specifically for `LTS` tags):**
   ```http
   GET https://api.github.com/repos/{owner}/{repo}/releases?per_page=10
   ```
3. **List User Repositories (for portfolio discovery):**
   ```http
   GET https://api.github.com/users/{username}/repos?sort=updated&per_page=20
   ```

### Key JSON Fields to Map
- `tag_name`: Version number (e.g., `v1.2.0`)
- `name`: Release title
- `published_at`: ISO 8601 timestamp
- `body`: Markdown changelog
- `html_url`: Fallback link to the GitHub release page
- `assets[]`:
  - `name`: Filename
  - `size`: File size in bytes
  - `download_count`: Number of downloads
  - `browser_download_url`: Direct download URL

### Rate Limit Handling (CRITICAL)
Per official GitHub docs, unauthenticated client-side API requests are limited to **60 requests per hour per IP**.
To prevent hitting rate limits, implement **one** of the following strategies (Strategy B is preferred if using SSG):

- **Strategy A (Client-Side with Caching):**
  - Fetch release data on the client side and cache the JSON response in `localStorage` with a TTL (e.g., 30 minutes).
  - Include a graceful fallback UI linking directly to `https://github.com/{owner}/{repo}/releases/latest` if a `403` rate-limit error occurs.
- **Strategy B (Build-Time Data Fetching via GitHub Actions — Recommended):**
  - Run a Node.js script during the GitHub Actions build step using `GITHUB_TOKEN` (1,000 requests/hour limit) to fetch all project metadata and latest LTS releases into a static `src/data/releases.json` file.
  - Trigger automatic rebuilds via `schedule` (cron) or `repository_dispatch` whenever a new release is published.

---

## 4. Technical Stack & Design Guidelines

- **Framework:** Use a modern static-friendly frontend stack (e.g., **Vue 3 / Nuxt (SSG)** or **Vite + TypeScript + Tailwind CSS**). Ensure the output is 100% static HTML/CSS/JS compatible with GitHub Pages.
- **UI/UX:**
  - Clean, minimal developer-focused aesthetic with **Dark/Light mode** toggle.
  - Fully responsive (mobile, tablet, desktop).
  - Support **RTL / Persian** (or Bilingual Persian/English toggle) if the portfolio text is written in Persian.
- **Routing & Base Path:**
  - If deployed to `https://{username}.github.io`, set base path to `/`.
  - If deployed to `https://{username}.github.io/{repo-name}`, configure the bundler's `base` option to `/{repo-name}/` and handle SPA fallback (`404.html`) if using client-side routing.

---

## 5. Official GitHub Pages Deployment Workflow

Create `.github/workflows/deploy.yml` using GitHub's official Pages actions:

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:
  # Optional: auto-refresh releases every 6 hours if using build-time fetching
  schedule:
    - cron: "0 */6 * * *"

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist" # Adjust to .output/public if using Nuxt SSG

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 6. Execution Checklist for the AI Agent

1. [ ] Inspect my GitHub repositories and identify which repos should be featured in the **Portfolio** and which have **Releases** to display in the **LTS Releases Hub**.
2. [ ] Create a clean configuration file (`src/config/projects.ts` or `.json`) listing the repositories so I can easily add/remove projects later.
3. [ ] Scaffold the frontend project with Tailwind CSS and responsive components for Hero, Projects, and LTS Downloads.
4. [ ] Implement the GitHub Releases fetching logic (with Markdown changelog rendering, file size formatting, and rate-limit protection).
5. [ ] Add `.github/workflows/deploy.yml` configured for the chosen build tool's output directory.
6. [ ] Verify the static build completes without errors (`npm run build`).