import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    resolve: {
        alias: {
            "~": fileURLToPath(new URL("./app", import.meta.url)),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:1337",
                changeOrigin: true,
            },
        },
    },
    plugins: [tsconfigPaths(), tailwindcss(), reactRouter()],
});
