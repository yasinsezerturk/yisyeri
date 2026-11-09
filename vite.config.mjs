import { defineConfig, loadEnv, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");
  return {
    plugins: [
      {
        name: "jsx-in-source-js",
        enforce: "pre",
        async transform(code, id) {
          if (!/\/src\/.*\.js$/.test(id.replace(/\\/g, "/"))) return null;
          return transformWithEsbuild(code, id, { loader: "jsx", jsx: "automatic" });
        },
      },
      react(),
    ],
    envPrefix: "REACT_APP_",
    // Preserve the two existing service settings without exposing other process variables.
    // Tests use their own runtime environment values.
    define: mode === "test" ? {} : {
      "process.env.REACT_APP_API_USERNAME": JSON.stringify(env.REACT_APP_API_USERNAME || ""),
      "process.env.REACT_APP_API_PASSWORD": JSON.stringify(env.REACT_APP_API_PASSWORD || ""),
    },
    optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
    server: { host: "127.0.0.1", port: 3000 },
    build: {
      outDir: "build",
      sourcemap: false,
      target: "es2020",
      rollupOptions: {
        output: {
          entryFileNames: "static/js/main.[hash].js",
          chunkFileNames: "static/js/[name].[hash].js",
          assetFileNames: (asset) => asset.names.some((name) => name.endsWith(".css"))
            ? "static/css/main.[hash][extname]"
            : "static/media/[name].[hash][extname]",
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/setupTests.js"],
      include: ["src/**/*.test.{js,jsx}"],
      clearMocks: true,
    },
  };
});
