import path from "path";

import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    esbuild: {
      loader: 'tsx',
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.ts': 'tsx',
          '.tsx': 'tsx',
        },
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      svgr(),
    ],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  };
});
