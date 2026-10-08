/**
 * Resolves the API Base URL for JanNetra.
 *
 * 1. Server-side runtime (e.g. NextAuth route handler on Vercel):
 *    Uses Vercel service binding `process.env.API_URL` if present,
 *    which points to the internal Flask API service.
 *
 * 2. Client-side runtime / Local development:
 *    Uses `process.env.NEXT_PUBLIC_API_URL` if set (e.g. "http://localhost:8000/api/v1"),
 *    or falls back to "/api/v1" for production same-domain Vercel rewrites.
 */
export function getApiBaseUrl(): string {
    // Server-side function execution on Vercel (service binding)
    if (typeof window === "undefined" && process.env.API_URL) {
        const internalUrl = process.env.API_URL.replace(/\/$/, "")
        return `${internalUrl}/api/v1`
    }

    // Explicit public URL from environment
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    }

    // Same-origin relative path for unified Vercel deployment
    return "/api/v1"
}
