/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // ── Type ──
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only
        "merge", // Merge
        "style", // Formatting, no code change
        "refactor", // Code restructure, no feature/fix
        "perf", // Performance improvement
        "test", // Adding/updating tests
        "build", // Build system or dependencies
        "ci", // CI configuration
        "chore", // Maintenance tasks
        "revert", // Revert a commit
      ],
    ],
    // ── Scope (optional but encouraged) ──
    "scope-case": [2, "always", "lower-case"],
    // ── Subject ──
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    // ── Header ──
    "header-max-length": [2, "always", 100],
    // ── Body ──
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 200],
    // ── Footer ──
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 200],
  },
};

export default config;
