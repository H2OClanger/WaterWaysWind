/** Immutable application version metadata. */
export const VERSION = Object.freeze({
  major: 0,
  minor: 1,
  patch: 0,
  prerelease: 'alpha.1'
} as const);

export const VERSION_STRING = `v${VERSION.major}.${VERSION.minor}.${VERSION.patch}-${VERSION.prerelease}`;
