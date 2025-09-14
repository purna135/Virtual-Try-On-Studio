/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SEEDREAM_API_KEY: string
  readonly VITE_SEEDREAM_MODEL_ID: string
  readonly VITE_SEEDREAM_API_URL: string
  readonly VITE_DEFAULT_MOCK_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
