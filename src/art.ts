import { icon, type Icon } from './icons';

export function heroArt() {
  const pixels = [];
  for (let y = -11; y <= 11; y++) {
    for (let x = -11; x <= 11; x++) {
      const ax = Math.abs(x), ay = Math.abs(y);
      if ((Math.min(ax, ay) <= 1 && Math.max(ax, ay) <= 10) || (Math.abs(ax - ay) <= 1 && Math.max(ax, ay) <= 8)) {
        pixels.push([x, y]);
      }
    }
  }
  const tile = (x: number, y: number, depth: number, palette: string[]) => `<rect x="${205 + x * 12 + depth}" y="${148 + y * 12 + depth}" width="12" height="12" fill="${palette[Math.min(palette.length - 1, Math.max(0, Math.floor((x + y + 19) / 8)))]}"/>`;
  return `<svg class="hero-drawing" viewBox="0 0 432 310" aria-hidden="true" shape-rendering="crispEdges">
    <defs><pattern id="art-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="#a77bea" stroke-opacity=".13"/></pattern><radialGradient id="art-glow"><stop stop-color="#9b56fa" stop-opacity=".25"/><stop offset="1" stop-color="#9b56fa" stop-opacity="0"/></radialGradient></defs>
    <rect x="8" y="0" width="416" height="310" fill="url(#art-grid)"/><ellipse cx="216" cy="152" rx="190" ry="147" fill="url(#art-glow)"/>
    <g fill="none" stroke="#b390ed" stroke-opacity=".38"><path d="M25 54V25h29m324 0h29v29M25 256v29h29m324 0h29v-29"/><path d="M86 83V52h31m198 0h31v31M86 226v31h31m198 0h31v-31"/><path d="M216 15v13m-6-7h12M216 281v13m-6-7h12M47 148h13m-7-6v12m319-6h13m-7-6v12"/></g>
    <g fill="#c7a3fc"><path d="M53 95h5v5h-5zM365 66h5v5h-5zM384 208h4v4h-4zM67 228h4v4h-4zM293 19h3v3h-3zM114 275h3v3h-3z"/></g>
    <g>${pixels.map(([x, y]) => tile(x, y, 17, ['#291847','#39245d','#42286b','#503080','#5c3597'])).join('')}
    ${pixels.map(([x, y]) => tile(x, y, 8, ['#6743a0','#734db1','#8050be','#824ec3','#9154dc'])).join('')}
    ${pixels.map(([x, y]) => tile(x, y, 0, ['#f0dcff','#e3c5ff','#d0aaff','#bf8dfb','#a873f4'])).join('')}</g>
  </svg>`;
}

export function cardArt(name: string) {
  const requested: Record<string, Icon> = { music: 'music', terminal: 'terminal', map: 'map', checks: 'checks', wave: 'wave', window: 'window' };
  const art = Object.hasOwn(requested, name) ? name : 'window';
  const patterns: Record<string, string> = {
    music: '<path d="M0 85h75l11-24 14 43 14-60 17 69 15-46 15 19h150l10-15 14 32 12-43 13 24h40"/>',
    terminal: '<path d="M0 74h71l29 26h46m-146-51h90l26 20h42m247 25h-80l-31 29h-50m161-62h-103l-24 21h-36"/>',
    map: '<path d="M-5 109 111 16l47 35 57-44 52 35 41-25 95 62M-10 136l108-79 54 36 61-49 58 33 38-24 101 61M94 140l43-34 37 31m91 6 15-19 39 17"/>',
    checks: '<path d="M0 65h133m-133 18h111M271 65h128M295 83h104m-390 25h94m201 0h94"/>',
    wave: '<path d="M0 82c38 0 35-36 64-36s30 65 65 65 36-70 67-70 36 66 69 66 38-61 70-61 31 37 65 37"/>',
    window: '<path d="M0 29h132m-132 94h132m136-94h132m-132 94h132M77 0v150M323 0v150"/><rect x="40" y="45" width="92" height="64" rx="6"/><rect x="268" y="45" width="92" height="64" rx="6"/>',
  };
  return `<div class="card-art art-${art}" aria-hidden="true"><svg class="card-lines" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">${patterns[art]}</svg><div class="art-icon">${icon(requested[art], 32)}</div><i></i><i></i></div>`;
}
