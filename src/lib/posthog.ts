import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  posthog.init("phc_npxG9TEEPkf5oYBjsgs8CRpFjJjBhQUaptKuVAQULaBd", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });
}

export { posthog };
