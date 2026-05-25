import posthog from "posthog-js";

const PROJECT_POSTHOG_TOKEN = "phc_npxG9TEEPkf5oYBjsgs8CRpFjJjBhQUaptKuVAQULaBd";

const POSTHOG_TOKEN =
  (import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined) ??
  (import.meta.env.VITE_POSTHOG_KEY as string | undefined) ??
  PROJECT_POSTHOG_TOKEN;

export const POSTHOG_HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) ??
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://eu.i.posthog.com";

export const IS_POSTHOG_CONFIGURED = Boolean(POSTHOG_TOKEN);

if (typeof window !== "undefined" && POSTHOG_TOKEN) {
  posthog.init(POSTHOG_TOKEN, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
  });
}

export function track(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !POSTHOG_TOKEN) return;

  posthog.capture(event, {
    page_url: window.location.href,
    ...properties,
  });
}

export { posthog };
