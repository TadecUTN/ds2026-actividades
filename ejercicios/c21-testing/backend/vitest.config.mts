import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// Los tests corren siempre dentro del container (docker compose exec/run):
// "db" ya es el hostname correcto, sin traducir puertos.
const env = loadEnv("test", process.cwd(), "");

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests", // nunca el real
      DATABASE_URL: env.DATABASE_URL ?? "",
    },
    coverage: {
      clean: false,
    },
  },
});
