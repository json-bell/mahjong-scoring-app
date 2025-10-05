import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://mahjong-api.onrender.com/openapi.json",
  output: "src/api",
  plugins: ["@hey-api/client-axios"],
});
