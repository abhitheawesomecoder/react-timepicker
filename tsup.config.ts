import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2019",
  external: ["react", "react-dom"],
  outExtension({ format }) {
    return format === "esm"
      ? { js: ".js", dts: ".d.ts" }
      : { js: ".cjs", dts: ".d.cts" };
  }
});
