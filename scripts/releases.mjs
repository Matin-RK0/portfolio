const LTS = /(?:^|[^a-z0-9])lts(?:$|[^a-z0-9])/i;
const stable = release => release && !release.draft && !release.prerelease && release.published_at;
const timestamp = release => Date.parse(release.published_at);

function semver(tag) {
  return String(tag ?? '').match(/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:(?:[-_. ]lts)(?:[-_. ]\d+)?)?(?:\+[\w.-]+)?$/i)?.slice(1).map(BigInt);
}

function newest(a, b, prefixLength) {
  const av = semver(a.tag_name?.slice(prefixLength));
  const bv = semver(b.tag_name?.slice(prefixLength));
  if (av && bv) {
    for (let i = 0; i < 3; i++) {
      if (av[i] !== bv[i]) return av[i] > bv[i] ? -1 : 1;
    }
  } else if (av || bv) {
    return av ? -1 : 1;
  }
  return timestamp(b) - timestamp(a);
}

export function selectRelease(releases, githubLatest, tagPrefix = '') {
  const prefix = tagPrefix.toLowerCase();
  const matches = release => stable(release) && (!prefix || release.tag_name?.toLowerCase().startsWith(prefix));
  const order = (a, b) => newest(a, b, prefix.length);
  const published = releases.filter(matches);
  const lts = published.filter(r => LTS.test(r.tag_name?.slice(prefix.length) ?? '') || LTS.test(r.name ?? '')).sort(order)[0];
  if (lts) return { release: lts, channel: 'lts' };
  const release = matches(githubLatest) ? githubLatest : published.sort(order)[0];
  return release ? { release, channel: 'stable' } : null;
}
