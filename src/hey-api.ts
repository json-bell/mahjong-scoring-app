import type { CreateClientConfig } from "./api/client.gen";

const API_URL = import.meta.env.VITE_API_URL;

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: API_URL,
});
