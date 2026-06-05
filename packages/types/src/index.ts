/** A standard API result envelope shared across apps. */
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** Minimal user shape shared between apps and the UI library. */
export interface User {
  id: string;
  name: string;
  email: string;
}
