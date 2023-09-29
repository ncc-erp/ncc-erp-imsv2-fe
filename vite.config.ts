import react from "@vitejs/plugin-react"
import * as path from "path"
import { defineConfig, loadEnv } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const aliases = {
    "@": path.resolve(__dirname, "./src/"),
    "@components": `${path.resolve(__dirname, "./src/components/")}`,
    "@api": path.resolve(__dirname, "./src/api")
  }

  const env = loadEnv(mode, process.cwd(), "")

  return {
    server: {
      port: env.VITE_REACT_APP_PORT || 5173
    },
    plugins: [
      react(),
      {
        // default settings on build (i.e. fail on error)
        ...eslint(),
        apply: "build"
      },
      {
        // do not fail on serve (i.e. local development)
        ...eslint({
          failOnWarning: false,
          failOnError: false
        }),
        apply: "serve",
        enforce: "post"
      }
    ],
    test: {
      include: ["test/**/*.test.ts"],
      setupFiles: "./test/setup.ts",
      css: true,
      globals: true,
      environment: "jsdom"
    },
    resolve: {
      alias: aliases
    }
  }
})
