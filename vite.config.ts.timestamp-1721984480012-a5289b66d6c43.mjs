// vite.config.ts
import "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/dotenv/config.js";
import { vitePlugin as remix } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/@remix-run/dev/dist/index.js";
import { sentryVitePlugin } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { glob } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/glob/dist/esm/index.js";
import { metronome } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/metronome-sh/dist/esm/vite.js";
import { flatRoutes } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/remix-flat-routes/dist/index.js";
import { defineConfig } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/vite/dist/node/index.js";
import envOnly from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/vite-env-only/dist/index.js";
import { cjsInterop } from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/vite-plugin-cjs-interop/dist/index.js";
import tsconfigPaths from "file:///Users/jamesarcher/Documents/kentcdodds.com/node_modules/vite-tsconfig-paths/dist/index.mjs";
var MODE = process.env.NODE_ENV;
var vite_config_default = defineConfig(async () => {
  return {
    plugins: [
      cjsInterop({
        dependencies: [
          "md5-hash",
          "@remark-embedder/core",
          "@remark-embedder/transformer-oembed"
        ]
      }),
      envOnly(),
      remix({
        ignoredRouteFiles: ["**/*"],
        routes: async (defineRoutes) => {
          return flatRoutes("routes", defineRoutes, {
            ignoredRouteFiles: [
              ".*",
              "**/*.css",
              "**/*.test.{js,jsx,ts,tsx}",
              "**/__*.*"
            ]
          });
        }
      }),
      tsconfigPaths(),
      metronome(),
      process.env.SENTRY_UPLOAD ? sentryVitePlugin({
        disable: MODE !== "production",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        release: {
          name: process.env.COMMIT_SHA,
          setCommits: {
            auto: true
          }
        },
        sourcemaps: {
          filesToDeleteAfterUpload: await glob([
            "./build/**/*.map",
            ".server-build/**/*.map"
          ])
        }
      }) : null
    ],
    build: {
      cssMinify: MODE === "production",
      rollupOptions: {
        external: [/node:.*/, "stream", "crypto"]
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamFtZXNhcmNoZXIvRG9jdW1lbnRzL2tlbnRjZG9kZHMuY29tXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamFtZXNhcmNoZXIvRG9jdW1lbnRzL2tlbnRjZG9kZHMuY29tL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYW1lc2FyY2hlci9Eb2N1bWVudHMva2VudGNkb2Rkcy5jb20vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgJ2RvdGVudi9jb25maWcnXG5pbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnXG5pbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbidcbmltcG9ydCB7IGdsb2IgfSBmcm9tICdnbG9iJ1xuaW1wb3J0IHsgbWV0cm9ub21lIH0gZnJvbSAnbWV0cm9ub21lLXNoL3ZpdGUnXG5pbXBvcnQgeyBmbGF0Um91dGVzIH0gZnJvbSAncmVtaXgtZmxhdC1yb3V0ZXMnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGVudk9ubHkgZnJvbSAndml0ZS1lbnYtb25seSdcbmltcG9ydCB7IGNqc0ludGVyb3AgfSBmcm9tICd2aXRlLXBsdWdpbi1janMtaW50ZXJvcCdcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5cbmNvbnN0IE1PREUgPSBwcm9jZXNzLmVudi5OT0RFX0VOVlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdHBsdWdpbnM6IFtcblx0XHRcdGNqc0ludGVyb3Aoe1xuXHRcdFx0XHRkZXBlbmRlbmNpZXM6IFtcblx0XHRcdFx0XHQnbWQ1LWhhc2gnLFxuXHRcdFx0XHRcdCdAcmVtYXJrLWVtYmVkZGVyL2NvcmUnLFxuXHRcdFx0XHRcdCdAcmVtYXJrLWVtYmVkZGVyL3RyYW5zZm9ybWVyLW9lbWJlZCcsXG5cdFx0XHRcdF0sXG5cdFx0XHR9KSxcblx0XHRcdGVudk9ubHkoKSxcblx0XHRcdHJlbWl4KHtcblx0XHRcdFx0aWdub3JlZFJvdXRlRmlsZXM6IFsnKiovKiddLFxuXHRcdFx0XHRyb3V0ZXM6IGFzeW5jIChkZWZpbmVSb3V0ZXMpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gZmxhdFJvdXRlcygncm91dGVzJywgZGVmaW5lUm91dGVzLCB7XG5cdFx0XHRcdFx0XHRpZ25vcmVkUm91dGVGaWxlczogW1xuXHRcdFx0XHRcdFx0XHQnLionLFxuXHRcdFx0XHRcdFx0XHQnKiovKi5jc3MnLFxuXHRcdFx0XHRcdFx0XHQnKiovKi50ZXN0Lntqcyxqc3gsdHMsdHN4fScsXG5cdFx0XHRcdFx0XHRcdCcqKi9fXyouKicsXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSxcblx0XHRcdHRzY29uZmlnUGF0aHMoKSxcblx0XHRcdG1ldHJvbm9tZSgpLFxuXHRcdFx0cHJvY2Vzcy5lbnYuU0VOVFJZX1VQTE9BRFxuXHRcdFx0XHQ/IHNlbnRyeVZpdGVQbHVnaW4oe1xuXHRcdFx0XHRcdFx0ZGlzYWJsZTogTU9ERSAhPT0gJ3Byb2R1Y3Rpb24nLFxuXHRcdFx0XHRcdFx0YXV0aFRva2VuOiBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTixcblx0XHRcdFx0XHRcdG9yZzogcHJvY2Vzcy5lbnYuU0VOVFJZX09SRyxcblx0XHRcdFx0XHRcdHByb2plY3Q6IHByb2Nlc3MuZW52LlNFTlRSWV9QUk9KRUNULFxuXHRcdFx0XHRcdFx0cmVsZWFzZToge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBwcm9jZXNzLmVudi5DT01NSVRfU0hBLFxuXHRcdFx0XHRcdFx0XHRzZXRDb21taXRzOiB7XG5cdFx0XHRcdFx0XHRcdFx0YXV0bzogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzb3VyY2VtYXBzOiB7XG5cdFx0XHRcdFx0XHRcdGZpbGVzVG9EZWxldGVBZnRlclVwbG9hZDogYXdhaXQgZ2xvYihbXG5cdFx0XHRcdFx0XHRcdFx0Jy4vYnVpbGQvKiovKi5tYXAnLFxuXHRcdFx0XHRcdFx0XHRcdCcuc2VydmVyLWJ1aWxkLyoqLyoubWFwJyxcblx0XHRcdFx0XHRcdFx0XSksXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdDogbnVsbCxcblx0XHRdLFxuXHRcdGJ1aWxkOiB7XG5cdFx0XHRjc3NNaW5pZnk6IE1PREUgPT09ICdwcm9kdWN0aW9uJyxcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0ZXh0ZXJuYWw6IFsvbm9kZTouKi8sICdzdHJlYW0nLCAnY3J5cHRvJ10sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULE9BQU87QUFDMVQsU0FBUyxjQUFjLGFBQWE7QUFDcEMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxZQUFZO0FBQ3JCLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLG1CQUFtQjtBQUUxQixJQUFNLE9BQU8sUUFBUSxJQUFJO0FBRXpCLElBQU8sc0JBQVEsYUFBYSxZQUFZO0FBQ3ZDLFNBQU87QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNSLFdBQVc7QUFBQSxRQUNWLGNBQWM7QUFBQSxVQUNiO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNEO0FBQUEsTUFDRCxDQUFDO0FBQUEsTUFDRCxRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsUUFDTCxtQkFBbUIsQ0FBQyxNQUFNO0FBQUEsUUFDMUIsUUFBUSxPQUFPLGlCQUFpQjtBQUMvQixpQkFBTyxXQUFXLFVBQVUsY0FBYztBQUFBLFlBQ3pDLG1CQUFtQjtBQUFBLGNBQ2xCO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRDtBQUFBLFVBQ0QsQ0FBQztBQUFBLFFBQ0Y7QUFBQSxNQUNELENBQUM7QUFBQSxNQUNELGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLFFBQVEsSUFBSSxnQkFDVCxpQkFBaUI7QUFBQSxRQUNqQixTQUFTLFNBQVM7QUFBQSxRQUNsQixXQUFXLFFBQVEsSUFBSTtBQUFBLFFBQ3ZCLEtBQUssUUFBUSxJQUFJO0FBQUEsUUFDakIsU0FBUyxRQUFRLElBQUk7QUFBQSxRQUNyQixTQUFTO0FBQUEsVUFDUixNQUFNLFFBQVEsSUFBSTtBQUFBLFVBQ2xCLFlBQVk7QUFBQSxZQUNYLE1BQU07QUFBQSxVQUNQO0FBQUEsUUFDRDtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1gsMEJBQTBCLE1BQU0sS0FBSztBQUFBLFlBQ3BDO0FBQUEsWUFDQTtBQUFBLFVBQ0QsQ0FBQztBQUFBLFFBQ0Y7QUFBQSxNQUNELENBQUMsSUFDQTtBQUFBLElBQ0o7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNOLFdBQVcsU0FBUztBQUFBLE1BQ3BCLGVBQWU7QUFBQSxRQUNkLFVBQVUsQ0FBQyxXQUFXLFVBQVUsUUFBUTtBQUFBLE1BQ3pDO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
