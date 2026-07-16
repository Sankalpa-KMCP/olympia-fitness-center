import { expect, test } from "@playwright/test";

import { monitorRuntime, publicRoutes } from "./site-fixtures";

for (const route of publicRoutes) {
  test(`${route.label} renders with active navigation and a stable runtime`, async ({
    page,
  }) => {
    const runtime = monitorRuntime(page);
    const response = await page.goto(route.path);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: route.label, exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.locator('script:not([type="application/ld+json"])'),
    ).toHaveCount(1);
    expect(runtime.consoleErrors).toEqual([]);
    expect(runtime.pageErrors).toEqual([]);

    if (route.path === "/contact/") {
      const googleMapsHostSuffixes = [
        "google.com",
        "googleapis.com",
        "gstatic.com",
        "googleusercontent.com",
      ];
      const thirdPartyHosts = runtime.thirdPartyRequests.map(
        (requestUrl) => new URL(requestUrl).hostname,
      );

      expect(thirdPartyHosts.length).toBeGreaterThan(0);
      expect(
        thirdPartyHosts.every((hostname) =>
          googleMapsHostSuffixes.some(
            (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`),
          ),
        ),
      ).toBe(true);
    } else {
      expect(runtime.thirdPartyRequests).toEqual([]);
    }
  });
}

test("custom and disabled routes return the custom 404", async ({ page }) => {
  for (const path of ["/missing-s9/", "/gallery/", "/privacy/"]) {
    const response = await page.goto(path);

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Page not found.",
    );
  }
});

test("skip link and mobile navigation remain keyboard operable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  const menu = page.getByRole("button", { name: "Menu" });
  await expect(menu).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Tab");
  await expect(page.locator("main a").first()).toBeFocused();

  const outline = await page
    .locator("main a")
    .first()
    .evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
});

test("main Contact actions use only the verified phone and email", async ({
  page,
}) => {
  await page.goto("/contact/");

  await expect(page.locator('main a[href="tel:+94703609334"]')).toHaveCount(4);
  await expect(
    page.locator('main a[href="mailto:olympiafitnesswadduwa@gmail.com"]'),
  ).toHaveCount(3);
  await expect(page.locator("main form")).toHaveCount(0);
});

test("Zumba exposes all three anonymous class telephone actions", async ({
  page,
}) => {
  await page.goto("/zumba/");

  await expect(
    page.locator(
      '.class-contact-actions a[href="tel:+94777404804"], .class-contact-actions a[href="tel:+94777661968"], .class-contact-actions a[href="tel:+94714319742"]',
    ),
  ).toHaveCount(3);
});

test("every rendered internal route link resolves", async ({
  page,
  request,
}) => {
  const paths = new Set<string>();

  for (const route of publicRoutes) {
    await page.goto(route.path);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")),
      );

    for (const href of hrefs) {
      if (href) {
        paths.add(href.split("#", 1)[0] || "/");
      }
    }
  }

  for (const path of paths) {
    expect((await request.get(path)).status(), path).toBeLessThan(400);
  }
});

test("mobile, 200%-equivalent, and desktop widths do not overflow", async ({
  page,
}) => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 640, height: 900 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/contact/", { waitUntil: "domcontentloaded" });

    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      undersizedTargets: [...document.querySelectorAll("a, button")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width < 24 || rect.height < 24;
        })
        .map((element) => element.textContent?.trim()),
    }));

    expect(result).toEqual({ overflow: false, undersizedTargets: [] });
  }
});

test("reduced motion disables decorative effects without hiding content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const effectState = await page.evaluate(() => ({
    railAnimation: getComputedStyle(
      document.querySelector<HTMLElement>(".performance-rail__track")!,
    ).animationName,
    progressDisplay: getComputedStyle(
      document.querySelector<HTMLElement>(".scroll-progress")!,
    ).display,
  }));

  expect(effectState).toEqual({
    railAnimation: "none",
    progressDisplay: "none",
  });
  await expect(
    page.locator('main > section[data-reveal="pending"]').first(),
  ).toHaveAttribute("data-revealed", "true");
});
