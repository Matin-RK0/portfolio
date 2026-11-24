import '@fontsource/vazirmatn/arabic-400.css';
import '@fontsource/vazirmatn/arabic-600.css';
import '@fontsource/vazirmatn/arabic-700.css';
import '@fontsource/space-grotesk/latin-400.css';
import '@fontsource/space-grotesk/latin-600.css';
import '@fontsource/space-grotesk/latin-700.css';
import './style.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import snapshot from './data/releases.json';
import config from './config/projects.json';
import { heroArt, cardArt } from './art';
import { icon, mark, type Icon } from './icons';
import { copy, type Language } from './copy';

type Asset = { name: string; size: number; downloads: number; url: string };
type Release = { channel: 'lts' | 'stable'; tag: string; title: string; publishedAt: string; notes: string; url: string; assets: Asset[] };
type ProjectLink = { label: Record<Language, string>; url: string; kind: 'store' | 'web' | 'subscription' };
type Project = { id: string; name: string; nameFa?: string; description: Record<Language, string>; tags: string[]; art: string; featured: boolean; category: string; url?: string; demo?: string; links?: ProjectLink[]; release: Release | null; caseStudy?: boolean };
type PublicCaseStudy = Omit<Project, 'release' | 'caseStudy' | 'url'>;
const root = document.querySelector<HTMLDivElement>('#app')!;
const profile = snapshot.profile;
const caseStudyReleases = (snapshot as typeof snapshot & { caseStudyReleases?: Record<string, Release> }).caseStudyReleases ?? {};
const featured = (snapshot.projects as Project[]).some(project => project.featured);
const projects: Project[] = [
  ...(snapshot.projects as Project[]).map((project, index) => ({ ...project, featured: featured ? project.featured : index < 3 })),
  ...(config.publishedCaseStudies as PublicCaseStudy[]).map(project => ({
    id: project.id, name: project.name, nameFa: project.nameFa, description: project.description, tags: project.tags,
    art: project.art, category: project.category, featured: project.featured, demo: project.demo, links: project.links, caseStudy: true, release: caseStudyReleases[project.id] ?? null,
  })),
].sort((a, b) => Number(b.featured) - Number(a.featured));
const releases = projects.flatMap(project => project.release ? [{ project, release: project.release }] : [])
  .sort((a, b) => Number(b.release.channel === 'lts') - Number(a.release.channel === 'lts') || Date.parse(b.release.publishedAt) - Date.parse(a.release.publishedAt));
const categories = ['mobile', 'tools', 'testing', 'ui', 'web'] as const;
type Category = typeof categories[number];
let query = '';
let filter = 'all';
let language: Language = storage('protofito-language') === 'en' ? 'en' : 'fa';
let theme = storage('protofito-theme') === 'light' ? 'light' : 'dark';

function storage(key: string, value?: string) {
  try { if (value !== undefined) localStorage.setItem(key, value); else return localStorage.getItem(key); } catch { /* preferences are optional */ }
  return null;
}
function esc(value: string) {
  const replacements: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, char => replacements[char]);
}
function safeUrl(value = '') {
  if (!value) return '';
  try { const url = new URL(value); return url.protocol === 'https:' || url.protocol === 'http:' ? esc(url.href) : ''; } catch { return ''; }
}
const plain = (value: string) => `<bdi>${esc(value)}</bdi>`;
const github = safeUrl(profile.url);
const t = () => copy[language];
const projectTitle = (project: Project) => language === 'fa' && project.nameFa ? project.nameFa : project.name;
const locale = () => language === 'fa' ? 'fa-IR' : 'en';
const count = (number: number) => new Intl.NumberFormat(locale()).format(number);
const date = (value: string) => new Intl.DateTimeFormat(locale(), { dateStyle: 'medium', timeZone: 'Asia/Tehran' }).format(new Date(value));
const brand = () => `<a href="#top" class="brand" dir="ltr" aria-label="Protofito"><span class="brand-icon">${mark()}</span><strong>protofito<span>.</span></strong></a>`;
const chips = (tags: string[]) => tags.map(tag => `<span class="chip" dir="ltr">${esc(tag)}</span>`).join('');

function projectCard(project: Project) {
  const demo = safeUrl(project.demo), url = safeUrl(project.url);
  const actions = project.links ? project.links.flatMap(link => {
    const href = safeUrl(link.url);
    if (!href) return [];
    const type = link.kind === 'store' ? 'android' : link.kind === 'subscription' ? 'terminal' : 'upRight';
    return [`<a class="project-action" href="${href}">${icon(type, 16)} ${plain(link.label[language])}</a>`];
  }) : [
    url ? `<a href="${url}">${icon('github', 16)} ${t().source} ${icon('upRight', 15)}</a>` : '',
    demo ? `<a href="${demo}">${project.caseStudy ? t().caseStudy : t().demo} ${icon('upRight', 15)}</a>` : '',
  ].filter(Boolean);
  if (project.release) actions.push(`<a href="#release-${esc(project.id.replace(/[^a-z0-9_-]+/gi, '-'))}">${icon('download', 16)}${t().downloads}</a>`);
  const category = categories.includes(project.category as Category) ? t()[project.category as Category] : '';
  return `<article class="project-card">
    ${cardArt(project.art)}
    <div class="project-content">
      <div class="project-meta">${category ? `<span>${category}</span>` : ''}
        ${project.featured ? `<span class="featured"><i></i>${t().featured}</span>` : ''}
        ${project.caseStudy ? `<span class="featured">${t().publishedStudy}</span>` : ''}
      </div>
      <h3>${plain(projectTitle(project))}</h3>
      <p dir="auto">${esc(project.description[language] || project.description.en || project.description.fa || '')}</p>
      <div class="tags">${chips(project.tags)}</div>
      ${actions.length ? `<div class="project-links">${actions.join('')}</div>` : ''}
    </div>
  </article>`;
}

function assetIcon(name: string): Icon {
  if (/\.(apk|aab)$/i.test(name)) return 'android';
  if (/\.(deb|rpm|AppImage|flatpak)$/i.test(name)) return 'linux';
  if (/\.(exe|msi|msix)$/i.test(name)) return 'windows';
  if (/\.(dmg|pkg|ipa)$/i.test(name)) return 'apple';
  return 'box';
}
function fileSize(bytes: number) {
  const unit = bytes >= 1024 ** 2 ? 'MB' : bytes >= 1024 ? 'KB' : 'B';
  const scaled = bytes / (unit === 'MB' ? 1024 ** 2 : unit === 'KB' ? 1024 : 1);
  return `${new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(scaled)} ${unit}`;
}
function releaseCards() {
  if (!releases.length) return `<div class="release-empty">
    <span class="empty-icon">${icon('box', 29)}</span>
    <div><h3>${t().noReleases}</h3><p>${t().noReleasesBody}</p></div>
    <a class="button button-secondary" href="${github}?tab=repositories">${icon('github', 17)}${t().releaseOnGithub}${icon('upRight', 15)}</a>
  </div>`;
  return releases.map(({ project, release }) => {
    const url = safeUrl(release.url);
    const notes = release.notes.trim() ? DOMPurify.sanitize(marked.parse(release.notes, { async: false }), {
      ALLOWED_TAGS: ['a', 'blockquote', 'br', 'code', 'del', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'li', 'ol', 'p', 'pre', 'strong', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul'],
      ALLOWED_ATTR: ['href', 'title', 'start'],
      ALLOWED_URI_REGEXP: /^(?:https?:\/\/|mailto:|#)/i,
    }) : '';
    return `<article class="release-card" id="release-${esc(project.id.replace(/[^a-z0-9_-]+/gi, '-'))}"><div class="release-top">
      <span class="empty-icon">${icon('box', 26)}</span>
      <div><div class="release-project">${plain(projectTitle(project))} <span class="chip">${release.channel === 'lts' ? 'LTS' : t().stable}</span></div>
        <h3>${plain(release.title)}</h3><div class="release-meta"><code>${plain(release.tag)}</code><time datetime="${esc(release.publishedAt)}">${date(release.publishedAt)}</time></div></div>
      ${url ? `<a class="button button-secondary" href="${url}">${t().releaseOnGithub}${icon('upRight', 15)}</a>` : ''}
      </div>
      ${release.assets.length ? `<ul class="assets">${release.assets.map(asset => {
        const download = safeUrl(asset.url);
        return download ? `<li><a href="${download}"><span class="asset-icon">${icon(assetIcon(asset.name))}</span><span><strong>${plain(asset.name)}</strong><small>${plain(fileSize(asset.size))} · ${count(asset.downloads)} ${t().downloadWord}</small></span>${icon('download', 18)}</a></li>` : '';
      }).join('')}</ul>` : `<p class="asset-none">${t().noAssets}</p>`}
      ${notes ? `<details><summary>${t().notes}${icon('chevron', 17)}</summary><div dir="auto" class="markdown">${notes}</div></details>` : ''}
    </article>`;
  }).join('');
}

function updateProjects() {
  const term = query.trim().toLocaleLowerCase();
  const matching = projects.filter(p => {
    const contains = [p.name, p.nameFa, p.description.fa, p.description.en, ...p.tags].join(' ').toLocaleLowerCase().includes(term);
    return contains && (filter === 'all' || p.category === filter || p.tags.includes(filter));
  });
  document.querySelector('#project-grid')!.innerHTML = matching.map(projectCard).join('') ||
    `<p class="no-projects">${t().noProjects}</p>`;
  document.querySelector('#project-count')!.textContent = `${count(matching.length)} ${matching.length === 1 ? t().projectOne : t().countLabel}`;
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  const select = document.querySelector<HTMLSelectElement>('#tech-filter')!;
  select.value = select.querySelector('option[value="' + CSS.escape(filter) + '"]') ? filter : 'all';
}

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e0b13' : '#f7f3fc');
  const toggle = document.querySelector<HTMLButtonElement>('#theme')!;
  toggle.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 18);
  toggle.setAttribute('aria-label', theme === 'dark' ? t().themeLight : t().themeDark);
  toggle.title = theme === 'dark' ? t().themeLight : t().themeDark;
}

function render() {
  const text = t();
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  document.title = language === 'fa' ? 'Protofito — پورتفولیو و انتشارها' : 'Protofito — Portfolio & Releases';
  const tags = [...new Set(projects.flatMap(p => p.tags))];
  const avatar = safeUrl(profile.avatar);
  const socials = profile.links.map(({ label, url }) => {
    const safe = safeUrl(url);
    return safe ? `<a class="text-link" href="${safe}">${plain(label)} ${icon('upRight', 15)}</a>` : '';
  }).join('');
  root.innerHTML = `
    <a class="skip-link" href="#main">${text.skip}</a>
    <header class="site-header" id="top"><div class="frame header-inner">
      ${brand()}
      <nav aria-label="${language === 'fa' ? 'ناوبری اصلی' : 'Main navigation'}">
        <a href="#projects">${text.navProjects}</a><a href="#releases">${text.navReleases}</a><a href="#about">${text.navAbout}</a>
      </nav>
      <div class="header-actions">
        <button class="icon-button lang-button" id="language" type="button" aria-label="${text.language}" title="${text.language}">${language === 'fa' ? 'EN' : 'فا'}</button>
        <button class="icon-button" id="theme" type="button"></button>
        <a class="header-github icon-button" href="${github}" aria-label="GitHub" title="GitHub">${icon('github', 19)}</a>
      </div>
    </div></header>
    <main id="main">
      <section class="frame hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <span class="eyebrow hero-label"><i></i>${text.badge}</span>
          <h1 id="hero-title">${text.heroA}<br /><strong>${text.heroB}</strong></h1>
          <p>${text.intro}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#projects">${text.explore}${icon('down', 17)}</a>
            <a class="button button-secondary" href="#releases">${icon('download', 17)}${text.downloads}</a>
          </div>
          <a class="hero-profile" href="${github}" dir="ltr">${avatar ? `<img src="${avatar}" width="23" height="23" alt="" />` : ''}<span>${esc(profile.name)}</span><span class="muted">@${esc(profile.login)}</span>${icon('upRight', 14)}</a>
        </div>
        <div class="hero-visual" aria-hidden="true" dir="ltr"><div class="visual-caption"><span><i></i> VISUAL INDEX</span><span>PTF / 001</span></div>
          ${heroArt()}
          <div class="visual-caption bottom"><span>FIG.01 — PROTOFITO MARK</span><span>24 × 24</span></div>
        </div>
      </section>
      <section class="frame section" id="projects" aria-labelledby="projects-title">
        <div class="section-title"><div class="eyebrow"><span class="label-number" dir="ltr">01 /</span>${text.projectsLabel}</div>
          <h2 id="projects-title">${text.navProjects}</h2><p>${text.projectIntro}</p></div>
        <div class="project-toolbar flex flex-wrap items-center">
          <div class="project-filters" role="group" aria-label="${text.navProjects}">
            <button type="button" data-filter="all">${text.all}</button>
            ${categories.filter(category => projects.some(p => p.category === category)).map(category => `<button type="button" data-filter="${category}">${text[category]}</button>`).join('')}
          </div>
          <div class="search-controls flex items-center">
            <select id="tech-filter" aria-label="${text.toolsLabel}"><option value="all">${text.toolsLabel}</option>${tags.sort().map(tag => `<option value="${esc(tag)}">${esc(tag)}</option>`).join('')}</select>
            <label class="project-search">${icon('search', 17)}<input id="project-search" type="search" placeholder="${text.search}" aria-label="${text.search}" value="${esc(query)}" /></label>
          </div>
        </div>
        <p class="sr-only" id="project-count" role="status"></p><div id="project-grid" class="project-grid"></div>
      </section>
      <section class="frame section" id="releases" aria-labelledby="releases-title">
        <div class="section-heading"><div class="section-title"><div class="eyebrow"><span class="label-number" dir="ltr">02 /</span>${text.releasesLabel}</div>
          <h2 id="releases-title">${text.downloads}</h2><p>${text.releaseIntro}</p></div>
          <span class="sync-badge"><i></i>${text.syncBadge}</span>
        </div>
        <div class="release-list">${releaseCards()}</div>
        <p class="sync-date">${text.updated}: <time datetime="${esc(snapshot.syncedAt)}">${date(snapshot.syncedAt)}</time></p>
      </section>
      <section class="frame section about" id="about" aria-labelledby="about-title">
        <div class="section-title"><div class="eyebrow"><span class="label-number" dir="ltr">03 /</span>${text.navAbout}</div><h2 id="about-title">${text.about}</h2></div>
        <div class="about-card">
          <div class="about-person">${avatar ? `<img src="${avatar}" width="68" height="68" alt="" loading="lazy" />` : ''}
            <div><h3>${plain(profile.name)}</h3><p dir="auto">${esc(profile.bio || text.aboutBio)}</p>
              <div class="profile-links"><a class="text-link" href="${github}">${icon('github', 16)}${text.profile}${icon('upRight', 15)}</a>${socials}</div>
            </div></div>
          <div class="stack"><span class="eyebrow">${text.toolsLabel}</span><div class="tags">${chips(tags.slice(0, 12))}</div></div>
        </div>
      </section>
    </main>
    <footer class="site-footer"><div class="frame footer-inner">${brand()}<span dir="ltr">© ${new Date().getFullYear()} ${esc(profile.name)}</span><a class="text-link" href="#top">${text.top}${icon('up', 16)}</a></div></footer>`;

  updateProjects();
  applyTheme();
  document.querySelector('#theme')!.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    storage('protofito-theme', theme);
    applyTheme();
  });
  document.querySelector('#language')!.addEventListener('click', () => {
    language = language === 'fa' ? 'en' : 'fa';
    storage('protofito-language', language);
    render();
    document.querySelector<HTMLButtonElement>('#language')!.focus({ preventScroll: true });
  });
  document.querySelector('#project-search')!.addEventListener('input', event => {
    query = (event.currentTarget as HTMLInputElement).value;
    updateProjects();
  });
  document.querySelector('#tech-filter')!.addEventListener('change', event => {
    filter = (event.currentTarget as HTMLSelectElement).value;
    updateProjects();
  });
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter ?? 'all';
    updateProjects();
  }));
}

render();
