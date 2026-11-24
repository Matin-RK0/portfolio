# Protofito

A bilingual developer portfolio and stable release hub for [Matin Ramezani](https://github.com/Matin-RK0). Visitors can browse projects by category or technology, read release notes, and download release assets without a GitHub account.

## Run locally

Use Node.js 22.12 or newer (Node.js 24 in CI).

```sh
npm ci
npm run dev
```

```sh
npm run sync     # Refresh public data from GitHub (optional for local work)
npm run check    # Type checking and release selection tests
npm run build    # Build static assets into dist/
npm run preview  # Serve the production build locally
```

The checked-in `src/data/releases.json` snapshot makes the local build independent of GitHub or credentials. The workflow syncs current data before every deployment. Website visitors do not call the GitHub API, and a failed sync leaves the last deployment online.

## Configure projects

Edit [src/config/projects.json](src/config/projects.json) to change the GitHub account or configure projects:

- With `discoverPublicRepositories` enabled, public owned repositories are discovered automatically. Public pinned repositories are preferred when the GitHub token can read the GitHub GraphQL endpoint. Explicit `featured` values override pins. Unlisted projects get their GitHub description and language/topic tags.
- Use the `projects` map to add display names, bilingual descriptions, tags, an optional live demo, and a category (`mobile`, `tools`, `testing`, `ui`, or `web`). Set `enabled` to `false` or use `exclude` to hide a repository. This portfolio uses a curated list: `discoverPublicRepositories` is `false`, so only explicit projects and public case studies appear.
- Only put material intended for **public** viewing in `publishedCaseStudies`. For a private project, use an independent public ID and an approved name, description, technologies, artwork, and optional public demo or case study link. Do not include its private repository URL, credentials, source, or release assets here. This is an example of the public shape:

```json
{
  "id": "approved-case-study",
  "name": "Project title approved for publication",
  "description": { "en": "Public summary.", "fa": "معرفی عمومی." },
  "tags": ["Flutter"],
  "category": "mobile",
  "art": "window",
  "featured": false
}
```

For public downloads of a project whose source stays private, create a separate **public distribution repository** and add its public `owner/repo` to the case study's `releaseRepository`. The site excludes that repository from the source project list and attaches its public release to the case study instead. GitHub releases attached to private repositories require access to those repositories. See the [Persian release publishing guide](docs/PUBLISHING-FA.md).

## Publish with GitHub Pages

1. Put this project in a GitHub repository on a `main` branch, for example `Matin-RK0/protofito`. To publish at the account root, use `Matin-RK0/Matin-RK0.github.io`.
2. In the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Run **Actions → Build and deploy Protofito → Run workflow**. The workflow publishes `dist/` with the official GitHub Pages actions and uses the configured Pages base path.

Builds run on pushes to `main` and are scheduled every six hours. For faster updates, a release publishing workflow may send a `repository_dispatch` event with type `release-published` to this repository using suitably scoped credentials. The regular schedule works without configuring another workflow or personal token.

For each public project, the sync ignores drafts and prereleases, prioritizes explicitly named LTS releases, and otherwise uses the stable release marked latest by GitHub. If that endpoint has no result, it falls back to version/date ordering. Release Markdown is sanitized before rendering. Download counts reflect the current snapshot.

See [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub Releases API](https://docs.github.com/en/rest/releases/releases), and [REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

## Project READMEs

The [repository-readmes](repository-readmes/) directory contains a tailored replacement README for each public repository. These files were prepared locally. To publish one, first review it against the latest default branch of the corresponding repository, then propose it as that repository’s `README.md`.
