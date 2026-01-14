import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  // Default for local dev
  let base = "/";

  // GitHub Actions sets GITHUB_REPOSITORY=owner/repo
  if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
    base = `/${repo}/`;
  }

  return {
    base,
  };
});
