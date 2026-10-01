// Types for the variables in .env.example. Next.js loads them from .env*;
// NEXT_PUBLIC_* values are inlined into the browser bundle at build time.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_URL?: string;
  }
}
