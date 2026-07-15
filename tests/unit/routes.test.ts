import { describe, expect, it } from "vitest";

import {
  isCurrentRoute,
  primaryNavigationRoutes,
  siteRoutes,
} from "../../src/config/routes";

describe("site route configuration", () => {
  it("contains only the five S4 routes and exposes four navigation links", () => {
    expect(Object.values(siteRoutes).map((route) => route.path)).toEqual([
      "/",
      "/services/",
      "/zumba/",
      "/contact/",
      "/404.html",
    ]);
    expect(primaryNavigationRoutes.map((route) => route.path)).toEqual([
      "/",
      "/services/",
      "/zumba/",
      "/contact/",
    ]);
    expect(
      new Set(primaryNavigationRoutes.map((route) => route.path)).size,
    ).toBe(primaryNavigationRoutes.length);
  });

  it("matches active routes exactly after safe path normalization", () => {
    expect(isCurrentRoute("/", siteRoutes.home.path)).toBe(true);
    expect(isCurrentRoute("/services", siteRoutes.services.path)).toBe(true);
    expect(
      isCurrentRoute("/services/?view=technical", siteRoutes.services.path),
    ).toBe(true);
    expect(isCurrentRoute("/services/", siteRoutes.home.path)).toBe(false);
    expect(isCurrentRoute("/404.html", siteRoutes.contact.path)).toBe(false);
  });
});
