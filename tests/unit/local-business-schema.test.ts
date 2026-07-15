import { describe, expect, it } from "vitest";

import { buildLocalBusinessStructuredData } from "../../src/utils/local-business-schema";
import { serializeStructuredData } from "../../src/utils/seo";

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
  "employee",
  "makesOffer",
  "offers",
  "paymentAccepted",
  "acceptedPaymentMethod",
] as const;

describe("verified local-business structured data", () => {
  it("contains the exact identity, contact, and postal address fields", () => {
    const schema = buildLocalBusinessStructuredData();

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
  });

  it("keeps the two Monday–Saturday periods and Sunday period distinct", () => {
    expect(
      buildLocalBusinessStructuredData().openingHoursSpecification,
    ).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
          "https://schema.org/Saturday",
        ],
        opens: "06:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
          "https://schema.org/Saturday",
        ],
        opens: "16:30",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["https://schema.org/Sunday"],
        opens: "08:00",
        closes: "13:00",
      },
    ]);
  });

  it("omits Poya hours and every unsupported property", () => {
    const schema = buildLocalBusinessStructuredData();
    const serialized = JSON.stringify(schema);

    expect(serialized).not.toContain("Poya");
    for (const property of unsupportedProperties) {
      expect(schema).not.toHaveProperty(property);
    }
  });

  it("escapes script-closing input at the shared serialization boundary", () => {
    const schema = {
      ...buildLocalBusinessStructuredData(),
      name: "</script><script>alert('unsafe')</script>",
    };
    const serialized = serializeStructuredData(schema);

    expect(serialized).toBeDefined();
    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });
});
