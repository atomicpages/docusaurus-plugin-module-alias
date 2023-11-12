import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      enabled: true,
      cleanOnRerun: true,
      reporter: ["lcov", "html", "text", "text-summary"],
      reportsDirectory: "coverage",
      include: ["src/**/*.ts"],
    },
    reporters: ["default"],
  },
});
