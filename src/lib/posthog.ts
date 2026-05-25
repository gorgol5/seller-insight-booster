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
const DISTINCT_ID_STORAGE_KEY = "fashionhero_posthog_distinct_id";

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

  const payload = {
    page_url: window.location.href,
    ...properties,
  };

  posthog.capture(event, payload);
  captureDirect(event, payload);
}

export function capturePageview(properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !POSTHOG_TOKEN) return;

  const payload = {
    $current_url: window.location.href,
    page_url: window.location.href,
    path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    ...properties,
  };

  posthog.capture("$pageview", payload);
  captureDirect("$pageview", payload);
}

export function captureAutocapture(element: Element) {
  if (typeof window === "undefined" || !POSTHOG_TOKEN) return;

  const text = element.textContent?.trim().replace(/\s+/g, " ").slice(0, 120);
  captureDirect("$autocapture", {
    $current_url: window.location.href,
    $event_type: "click",
    $el_text: text || undefined,
    $el_tag: element.tagName.toLowerCase(),
    $el_id: element.id || undefined,
    $el_classes: element.getAttribute("class") || undefined,
    page_url: window.location.href,
  });
}

function captureDirect(event: string, properties: Record<string, unknown>) {
  const body = JSON.stringify({
    api_key: POSTHOG_TOKEN,
    event,
    distinct_id: getDistinctId(),
    properties,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(`${POSTHOG_HOST}/capture/`, blob)) return;
  }

  void fetch(`${POSTHOG_HOST}/capture/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

function getDistinctId() {
  const fromPostHog = posthog.get_distinct_id?.();
  if (fromPostHog) return fromPostHog;

  const existing = window.localStorage.getItem(DISTINCT_ID_STORAGE_KEY);
  if (existing) return existing;

  const next = crypto.randomUUID();
  window.localStorage.setItem(DISTINCT_ID_STORAGE_KEY, next);
  return next;
}

export { posthog };
