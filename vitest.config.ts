import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        preserveSymlinks: true,
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    test: {
        api: {
            port: parseInt(<string>process.env["FRONTEND_PORT"]),
            host: "localhost",
        },
    },
});
