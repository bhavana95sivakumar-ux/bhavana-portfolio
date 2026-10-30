"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";

/**
 * Makes every Motion animation on the page honour the visitor's
 * "reduce motion" OS setting. With `reducedMotion="user"` Motion keeps
 * opacity transitions but drops transform/layout movement, so the page
 * still reads as alive without any travel.
 */
export function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
