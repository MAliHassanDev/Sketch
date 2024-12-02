import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "ali-q0c",
    project: "sketch",
    telemetry: false,
  })],

  resolve: {
    alias: {
      "@/app": "/src/app",
      "@/components": "/src/components",
      "@/assets": "/src/assets",
      "@/utils": "/src/utils",
      "@/contexts": "/src/contexts",
      "@/features": "/src/features",
      "@/public": "/"
    },
  },

  build: {
    sourcemap: true
  },
  server: {
    host: "0.0.0.0"
  }
});