/** @type {import('lint-staged').Config} */
const config = {
  // ── TypeScript / JavaScript ──
  "*.{ts,tsx,js,jsx}": ["prettier --write"],

  // ── Styles ──
  "*.{css,scss,less}": ["prettier --write"],

  // ── JSON / YAML / MD ──
  "*.{json,json5,yaml,yml,md,mdx}": ["prettier --write"],

  // ── Package manager lock files — skip formatting ──
  "package-lock.json": [],
  "pnpm-lock.yaml": [],
  "yarn.lock": [],
};

export default config;
