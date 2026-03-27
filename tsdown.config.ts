import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
    // "src/types/index.ts"
  ],
  format: [
    "cjs",
    "esm"
  ], // Build for commonJS and ESmodules
  sourcemap: false,
  clean: true,
  // target: 'esnext',
  exports: true,
  dts: true,
  treeshake: false,
  banner: `
/* -------------------------------------------------------------------------- */
/*                              INERTIA LIGHTING                              */
/* -------------------------------------------------------------------------- */
  `
});
