import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { publicRoutes } from "./site-fixtures";

for (const route of publicRoutes) {
  test(`${route.label} has no serious or critical axe violations`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(route.path);

    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    );
    const lowerSeverity = results.violations.filter(
      (violation) =>
        violation.impact !== "serious" && violation.impact !== "critical",
    );

    console.log(
      `[axe] ${route.label}: ${blocking.length} serious/critical; ${lowerSeverity.length} lower-severity findings`,
    );

    await testInfo.attach("axe-lower-severity-findings", {
      body: JSON.stringify(lowerSeverity, null, 2),
      contentType: "application/json",
    });

    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}
