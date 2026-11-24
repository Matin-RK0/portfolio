import { readFile, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { selectRelease } from './releases.mjs';

const config = JSON.parse(await readFile(new URL('../src/config/projects.json', import.meta.url), 'utf8'));
const token = process.env.GITHUB_TOKEN;
const root = 'https://api.github.com';
const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(token && { Authorization: `Bearer ${token}` }) };
const user = encodeURIComponent(config.githubUser);

async function request(path, options = {}) {
  const { allow404 = false, body } = options;
  for (let attempt = 0; attempt < 3; attempt++) {
    let response;
    try {
      response = await fetch(root + path, {
        headers: body ? { ...headers, 'Content-Type': 'application/json' } : headers,
        ...(body && { method: 'POST', body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      if (attempt === 2) throw new Error(`Connection to GitHub failed for ${path}`, { cause: error });
      await delay(1200 * (attempt + 1));
      continue;
    }
    if (response.status === 404 && allow404) return { data: null, next: false };
    if (response.ok) return { data: await response.json(), next: /rel="next"/.test(response.headers.get('link') || '') };
    if (response.status === 429 || (response.status === 403 && (response.headers.has('retry-after') || response.headers.get('x-ratelimit-remaining') === '0'))) {
      const reset = response.headers.get('x-ratelimit-reset');
      const retry = response.headers.get('retry-after');
      throw new Error(`GitHub API rate limit reached for ${path}. ${retry ? `Retry after ${retry}s.` : reset ? `Resets at ${new Date(Number(reset) * 1000).toISOString()}.` : 'Wait before retrying.'} Previous snapshot was kept.`);
    }
    if (response.status >= 500 && attempt < 2) {
      await delay(1200 * (attempt + 1));
      continue;
    }
    throw new Error(`GitHub returned ${response.status} for ${path}. Previous snapshot was kept.`);
  }
}

const get = async (path, options) => (await request(path, options)).data;
async function list(path) {
  const items = [];
  for (let page = 1; ; page++) {
    const { data, next } = await request(`${path}&page=${page}`);
    items.push(...data);
    if (!next) return items;
  }
}

async function pins() {
  if (!token || !config.discoverPublicRepositories) return [];
  try {
    const { data, errors } = await get('/graphql', { body: {
      query: 'query($login:String!){user(login:$login){pinnedItems(first:6,types:[REPOSITORY]){nodes{... on Repository{nameWithOwner isPrivate}}}}}',
      variables: { login: config.githubUser },
    } });
    if (errors) throw new Error('GraphQL pinned items unavailable for this token');
    return (data?.user?.pinnedItems?.nodes ?? []).filter(r => r && !r.isPrivate).map(r => r.nameWithOwner);
  } catch (error) {
    console.warn(`${error.message}; using configured featured projects.`);
    return [];
  }
}

function repoPath(name) {
  const parts = name.split('/');
  if (parts.length !== 2 || !parts.every(p => /^[a-z0-9_.-]+$/i.test(p) && p !== '.' && p !== '..')) throw new Error(`Invalid repository: ${name}`);
  return `/repos/${parts.map(encodeURIComponent).join('/')}`;
}

async function releasesFor(path) {
  const all = await list(`${path}/releases?per_page=10`);
  if (!all.some(r => !r.prerelease && !r.draft && r.published_at)) return null;
  const lts = selectRelease(all, null);
  const selected = lts?.channel === 'lts' ? lts : selectRelease(all, await get(`${path}/releases/latest`, { allow404: true }));
  if (!selected) return null;
  const { release: r, channel } = selected;
  const assets = r.assets_url && r.id ? await list(`${path}/releases/${r.id}/assets?per_page=100`) : r.assets;
  return {
    channel, tag: r.tag_name, title: r.name || r.tag_name, publishedAt: r.published_at, notes: r.body || '', url: r.html_url,
    assets: (assets ?? []).filter(a => a.state === 'uploaded' && a.browser_download_url).map(a => ({ name: a.name, size: a.size, downloads: a.download_count, url: a.browser_download_url })),
  };
}

async function project(repository, pinned, override) {
  const path = repoPath(repository.full_name);
  const [languages, release] = await Promise.all([override.tags ? {} : get(`${path}/languages`), releasesFor(path)]);
  const tags = [...new Set(override.tags ?? [...Object.keys(languages).slice(0, 3), ...repository.topics.slice(0, 4)])];
  const description = override.description || { en: repository.description || '', fa: repository.description || '' };
  return {
    id: repository.full_name.toLowerCase(), name: override.name || repository.name.replaceAll('_', ' '),
    description, url: repository.html_url, demo: override.demo || repository.homepage || '', tags,
    category: override.category || '', art: override.art || 'window', featured: override.featured ?? pinned,
    issues: repository.has_issues ? `${repository.html_url}/issues` : '', release,
  };
}

const [profile, social, repos, pinned] = await Promise.all([
  get(`/users/${user}`), get(`/users/${user}/social_accounts`),
  config.discoverPublicRepositories ? list(`/users/${user}/repos?type=owner&sort=updated&per_page=20`) : [],
  pins(),
]);
const overrides = new Map(Object.entries(config.projects).map(([key, value]) => [key.toLowerCase(), value]));
const pinnedSet = new Set(pinned.map(name => name.toLowerCase()));
const excluded = new Set(config.exclude.map(name => name.toLowerCase()));
if (process.env.GITHUB_REPOSITORY) excluded.add(process.env.GITHUB_REPOSITORY.toLowerCase());
const repositories = new Map(repos.map(r => [r.full_name.toLowerCase(), r]));
const caseStudyReleases = {};
for (const study of config.publishedCaseStudies ?? []) {
  if (!study.releaseRepository) continue;
  const key = study.releaseRepository.toLowerCase();
  excluded.add(key);
  const path = repoPath(study.releaseRepository);
  const repo = repositories.get(key) || await get(path, { allow404: true });
  if (!repo || repo.private || repo.visibility !== 'public') continue;
  const release = await releasesFor(repoPath(repo.full_name));
  if (release) caseStudyReleases[study.id] = release;
}
for (const name of [...overrides.keys(), ...pinnedSet]) {
  if (!repositories.has(name) && !excluded.has(name)) {
    const repo = await get(repoPath(name), { allow404: !overrides.has(name) });
    if (repo) repositories.set(name, repo);
  }
}

const projects = [];
for (const [name, repo] of repositories) {
  if (repo.private || repo.visibility !== 'public' || excluded.has(name)) continue;
  const override = overrides.get(name);
  if (override?.enabled === false) continue;
  if (!override && !pinnedSet.has(name) && ((!config.includeForks && repo.fork) || (!config.includeArchived && repo.archived))) continue;
  projects.push(await project(repo, pinnedSet.has(name), override ?? {}));
}
projects.sort((a, b) => Number(b.featured) - Number(a.featured));
const snapshot = {
  syncedAt: new Date().toISOString(),
  profile: {
    login: profile.login, name: profile.name || profile.login, bio: profile.bio || '', avatar: profile.avatar_url, url: profile.html_url,
    links: [...(profile.blog ? [{ label: 'Website', url: profile.blog }] : []), ...social.map(link => ({ label: link.provider, url: link.url }))],
  },
  projects, caseStudyReleases,
};
await writeFile(new URL('../src/data/releases.json', import.meta.url), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Synced @${profile.login}: ${projects.length} public projects, ${projects.filter(p => p.release).length + Object.keys(caseStudyReleases).length} releases.`);
