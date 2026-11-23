// src/hooks/useHydrated.ts
"use client";

import { useEffect, useState } from "react";

/**
 * False in the server HTML and until React has hydrated the component, then
 * true. Server-rendered buttons look ready before their click handlers are
 * attached, and clicks in that window are silently dropped (measured at
 * ~25-40 ms on a warm cache and several hundred ms on a cold first visit).
 * Use it to render such buttons disabled until they actually work.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
