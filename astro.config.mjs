import process from "node:process";

import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://sankalpa-kmcp.github.io",
  base: process.env.DEPLOY_BASE_PATH ?? "/",
});
