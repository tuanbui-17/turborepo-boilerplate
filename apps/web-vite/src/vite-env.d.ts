/// <reference types="vite/client" />

interface ViteTypeOptions {
  // Reject `import.meta.env.X` for keys not declared below.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
