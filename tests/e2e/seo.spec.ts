import { expect, test } from "@playwright/test";

import { publicRoutes } from "./site-fixtures";

const unsupportedProperties = [
  "@id",
  "url",
  "aggregateRating",
  "review",
  "priceRange",
  "image",
  "geo",
  "hasMap",
  "sameAs",
  "founder",
  "owner",
  "amenityFeature",
  "makesOffer",
  "offers",
  "paymentAccepted",
] as const;

test("public routes have unique factual metadata and restricted Open Graph fields", async ({
  page,
}) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const route of publicRoutes) {
    await page.goto(route.path);
    const title = await page.title();
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");

    expect(title.trim()).not.toBe("");
    expect(description?.trim()).not.toBe("");
    expect(titles.has(title), `duplicate title on ${route.path}`).toBe(false);
    expect(
      descriptions.has(description ?? ""),
      `duplicate description on ${route.path}`,
    ).toBe(false);
    titles.add(title);
    descriptions.add(description ?? "");

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", description ?? "");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});

for (const route of publicRoutes) {
  test(`${route.label} emits the verified HealthClub JSON-LD`, async ({
    page,
  }) => {
    await page.goto(route.path);
    const scripts = page.locator('script[type="application/ld+json"]');

    await expect(scripts).toHaveCount(1);
    const schema = JSON.parse((await scripts.textContent()) ?? "");

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "HealthClub",
      name: "Olympia Fitness Center",
      description: "Gym / fitness centre",
      telephone: "+94703609334",
      email: "olympiafitnesswadduwa@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 537/2/1, Galle Road",
        addressLocality: "Wadduwa",
        postalCode: "12560",
        addressCountry: "Sri Lanka",
      },
    });
    expect(schema.openingHoursSpecification).toHaveLength(3);
    expect(
      schema.openingHoursSpecification.map(
        ({ opens, closes }: { opens: string; closes: string }) => ({
          opens,
          closes,
        }),
      ),
    ).toEqual([
      { opens: "06:00", closes: "12:00" },
      { opens: "16:30", closes: "22:00" },
      { opens: "08:00", closes: "13:00" },
    ]);
    expect(JSON.stringify(schema)).not.toContain("Poya");
    for (const property of unsupportedProperties) {
      expect(schema).not.toHaveProperty(property);
    }
  });
}

test("404 and disabled routes emit no local-business JSON-LD", async ({
  page,
}) => {
  for (const path of ["/missing-s9/", "/gallery/", "/privacy/"]) {
    expect((await page.goto(path))?.status()).toBe(404);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "The requested website route could not be found.",
    );
    await expect(
      page.getByText("technical homepage", { exact: false }),
    ).toHaveCount(0);
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).toHaveCount(0);
  }
});

test("canonical and sitemap output remain absent", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect((await request.get("/sitemap.xml")).status()).toBe(404);
  expect((await request.get("/sitemap-index.xml")).status()).toBe(404);
});
