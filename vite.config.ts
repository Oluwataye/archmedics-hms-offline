import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), // Ensure React plugin is properly applied
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Remove leading `./`, use absolute path
      '@/*': path.resolve(__dirname, 'src/*'), // Optional: more explicit for tooling
    },
  },
  // --- Add explicit support for TSX files ---
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import React from 'react'`,
  },
  // --- Ensure TypeScript is processed correctly ---
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
