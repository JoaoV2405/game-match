// Used by Server Components and route handlers. Docker Compose resolves this
// hostname on its private network; local development falls back to localhost.
 export const API_URL = process.env.NEXT_PUBLIC_API_URL;

