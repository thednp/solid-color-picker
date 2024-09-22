import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";
import solidSVG from 'vite-plugin-solid-svg';
import path from "node:path";

export default defineConfig({
  plugins: [solid(), solidSVG({ svgo: { enabled: false }, defaultAsComponent: true })],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  test: {
    css: true,
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text", "lcov"],
      enabled: true,
      include: ["src/**/*.{ts,tsx}"],
    },
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      headless: true,
      name: 'chromium', // browser name is required
    },
  },  
});
