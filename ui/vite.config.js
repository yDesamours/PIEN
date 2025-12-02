import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import dns from "node:dns";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
        navigateFallbackAllowlist: [/^\/.*$/],
        runtimeCaching: [
          // 1. Fichiers Vite critiques
          {
            urlPattern: /@vite\/client/,
            handler: "CacheFirst",
            options: { cacheName: "vite-client" },
          },
          {
            urlPattern: /@react-refresh/,
            handler: "CacheFirst",
            options: { cacheName: "react-refresh" },
          },

          // 2. Votre code source
          {
            urlPattern: /\/src\/.*\.jsx?$/,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "source-code" },
          },

          // 3. Entry points
          {
            urlPattern: /@vite-plugin-pwa\/.*/,
            handler: "CacheFirst",
            options: { cacheName: "pwa-entry" },
          },

          // 4. HTML principal
          {
            urlPattern: /index\.html$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackAllowlist: [/^\/.*$/],

        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,json,woff,woff2,ttf,eot}",
        ],
        runtimeCaching: [
          {
            urlPattern: /index\.html$/,
            handler: "NetworkFirst",
            options: { cacheName: "app-html", networkTimeoutSeconds: 3 },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-data-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(js|css|json)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-js-css-cache",
            },
          },
          {
            urlPattern: /\.(png|jpg|jpeg|svg|ico|webp|woff|woff2)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-assets-cache",
            },
          },
        ],
      },

      includeAssets: ["favicon.ico", "offline.html"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/utilisateurs": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/cours": {
        target: "http://localhost:8082",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/multimedia": {
        target: "http://localhost:8083",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/classes": {
        target: "http://localhost:8084",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
