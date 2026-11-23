const paths = {
  github: '<path d="M9 19c-4.3 1.3-4.3-2.1-6-2.5m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6a4.7 4.7 0 0 0-1.2-3.3 4.4 4.4 0 0 0-.1-3.2s-1-.3-3.4 1.2a13 13 0 0 0-6.2 0C6.5 3 5.5 3.3 5.5 3.3a4.4 4.4 0 0 0-.1 3.2 4.7 4.7 0 0 0-1.2 3.3c0 4.7 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3V22"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.9 13.35a9 9 0 1 1-10.25-10.25 7 7 0 0 0 10.25 10.25Z"/>',
  upRight: '<path d="M7 17 17 7M7 7h10v10"/>',
  down: '<path d="M12 5v14m-6-6 6 6 6-6"/>',
  up: '<path d="M12 19V5m-6 6 6-6 6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm-9 5 9 5 9-5m-9 5v10M7.5 4.5l9 5"/>',
  search: '<circle cx="10.7" cy="10.7" r="5.7"/><path d="m15 15 4.5 4.5"/>',
  terminal: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7.5 9 2.5 3-2.5 3m5.5 0h3"/>',
  music: '<path d="M9 18V5l11-2v13M9 10l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>',
  map: '<path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  checks: '<path d="m3 7 2 2 4-4m-6 9 2 2 4-4m3-5h9m-9 7h9m-9 6h9"/>',
  wave: '<path d="M3 12h3l2-6 4 12 4-12 2 6h3"/>',
  window: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18m-14 4h10m-10 3h6"/>',
  android: '<path d="m7 7-2-3m12 3 2-3M3 16a9 9 0 1 1 18 0H3Zm5-4h.01m7.99 0h.01"/>',
  linux: '<path d="M8 9V6a4 4 0 0 1 8 0v3l2 3 2 5-2 2H6l-2-2 2-5 2-3Zm2 0 2 2 2-2m-2 2v4"/>',
  windows: '<path d="m3 6 8-1v6H3zm10-1 8-1v7h-8zM3 13h8v6l-8-1zm10 0h8v7l-8-1z"/>',
  apple: '<path d="M12 7c-1.6-1-4.1-1.8-6.1.4-2.7 3 .1 11.6 3.4 12.3 1.1.2 1.9-.8 3-.8s2.3 1.2 3.5.8c1.6-.5 2.9-2.7 3.5-4.6-3.3-1.6-3.5-5-.7-6.8-1.7-2-4.3-2-6.6-1.3Zm0-2c0-2 1.4-3 3-3-.1 1.7-1.2 3-3 3Z"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/>',
} as const;

export type Icon = keyof typeof paths;
export const icon = (name: Icon, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
export const mark = (size = 22) => `<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="currentColor" aria-hidden="true"><path d="M12 3h4v22h-4zM3 12h22v4H3zM5 5h5v5H5zM18 5h5v5h-5zM5 18h5v5H5zM18 18h5v5h-5z"/></svg>`;
