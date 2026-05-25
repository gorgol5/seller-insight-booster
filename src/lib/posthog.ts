import posthog from "posthog-js";

let initialized = false;

const FALLBACK_KEY = "phc_npxG9TEEPkf5oYBjsgs8CRpFjJjBhQUaptKuVAQULaBd";
const FALLBACK_HOST = "https://us.i.posthog.com";
const DEFAULT_ENV_HOST = "https://eu.i.posthog.com";

const envKey =
  (import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined) ??
  (import.meta.env.VITE_POSTHOG_KEY as string | undefined);
const envHost =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) ??
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined);

export const POSTHOG_KEY = envKey ?? FALLBACK_KEY;
export const POSTHOG_HOST = envHost ?? (envKey ? DEFAULT_ENV_HOST : FALLBACK_HOST);

export const IS_DEV =
  import.meta.env.DEV ||
  import.meta.env.MODE === "development" ||
  (typeof window !== "undefined" && /lovableproject\.com$/.test(window.location.hostname));

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: "2026-01-30",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true,
    loaded: (ph) => {
      if (IS_DEV) {
        ph.debug();
        // eslint-disable-next-line no-console
        console.info("[PostHog] initialized", { host: POSTHOG_HOST, key: POSTHOG_KEY.slice(0, 10) + "…" });
      }
    },
  });
}

export function capturePageview(path: string) {
  if (typeof window === "undefined") return;
  track("$pageview", {
    $current_url: window.location.href,
    path,
  });
}

export function track(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const enriched = {
    page_url: typeof window !== "undefined" ? window.location.href : undefined,
    ...properties,
  };
  if (IS_DEV) {
    // eslint-disable-next-line no-console
    console.log(`[PostHog event] ${event}`, enriched);
  }
  try {
    posthog.capture(event, enriched);
  } catch (e) {
    if (IS_DEV) console.warn("[PostHog] capture failed", e);
  }
}

export { posthog };
