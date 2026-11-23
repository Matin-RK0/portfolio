const LTS = /(?:^|[^a-z0-9])lts(?:$|[^a-z0-9])/i;
const stable = release => release && !release.draft && !release.prerelease && release.published_at;
const timestamp = release => Date.parse(release.published_at);

function semver(tag) {
  return String(tag ?? '').match(/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:(?:[-_. ]lts)(?:[-_. ]\d+)?)?(?:\+[\w.-]+)?$/i)?.slice(1).map(BigInt);
}

function newest(a, b) {
  const av = semver(a.tag_name);
  const bv = semver(b.tag_name);
  if (av && bv) {
    for (let i = 0; i < 3; i++) {
      if (av[i] !== bv[i]) return av[i] > bv[i] ? -1 : 1;
    }
  } else if (av || bv) {
    return av ? -1 : 1;
  }
  return timestamp(b) - timestamp(a);
}

export function selectRelease(releases, githubLatest) {
  const published = releases.filter(stable);
  const lts = published.filter(r => LTS.test(r.tag_name ?? '') || LTS.test(r.name ?? '')).sort(newest)[0];
  if (lts) return { release: lts, channel: 'lts' };
  const release = stable(githubLatest) ? githubLatest : published.sort(newest)[0];
  return release ? { release, channel: 'stable' } : null;
}
