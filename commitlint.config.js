const config = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    issuePrefixes: ["#"],
  },

  rules: {
    "references-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "hotfix", "refactor", "docs", "chore", "test", "style", "perf", "build", "revert", "ci"],
    ],
  },
};

export default config;
