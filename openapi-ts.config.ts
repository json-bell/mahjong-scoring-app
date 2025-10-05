import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://mahjong-api.onrender.com/openapi.json",
  output: "src/api",
  plugins: [
    {
      name: "@hey-api/client-axios",
      runtimeConfigPath: "../hey-api.ts",
    },
  ],
});
