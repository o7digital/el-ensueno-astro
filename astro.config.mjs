// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
  site: "https://murmullo.studio",
});
