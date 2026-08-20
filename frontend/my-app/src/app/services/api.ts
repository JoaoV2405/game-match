// Used by Server Components and route handlers. Docker Compose resolves this
// hostname on its private network; local development falls back to localhost.
export const API_URL = process.env.API_URL ?? "http://localhost:8000";

// Used only by code that runs in the browser. It must be reachable from the
// user's browser, not merely from another container.
export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
