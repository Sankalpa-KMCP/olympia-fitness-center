import { describe, expect, it } from "vitest";

import { externalDestinations, siteFeatures } from "../../src/config/site";
import type { ExternalDestination } from "../../src/types/external-destination";
import {
  createVerifiedExternalDestination,
  getEnabledExternalUrl,
} from "../../src/utils/external-destinations";

describe("external destination safety", () => {
  it("returns a URL only for a validated verified destination", () => {
    const destination = createVerifiedExternalDestination(
      "Verified example",
      "https://example.com/contact",
    );

    expect(destination).toEqual({
      label: "Verified example",
      state: "verified",
      url: "https://example.com/contact",
    });
    expect(getEnabledExternalUrl(destination)).toBe(
      "https://example.com/contact",
    );
  });

  it.each(["", "http://example.com", "javascript:alert(1)", "https://"])(
    "rejects an unsafe verified destination %j",
    (url) => {
      expect(() => createVerifiedExternalDestination("Example", url)).toThrow(
        TypeError,
      );
    },
  );

  it("fails closed if a malformed verified value bypasses the factory", () => {
    const malformed = {
      label: "Malformed",
      state: "verified",
      url: "https://",
    } as ExternalDestination;

    expect(getEnabledExternalUrl(malformed)).toBeUndefined();
  });

  it("keeps the supplied Google Maps destination verified and other real destinations disabled", () => {
    expect(Object.keys(externalDestinations)).toEqual([
      "whatsapp",
      "googleMaps",
      "facebook",
      "instagram",
      "canonicalOrigin",
    ]);

    expect(externalDestinations.googleMaps).toEqual({
      label: "Google Maps directions",
      state: "verified",
      url: "https://maps.app.goo.gl/kswD5wDU4rBQwje68",
    });
    expect(getEnabledExternalUrl(externalDestinations.googleMaps)).toBe(
      "https://maps.app.goo.gl/kswD5wDU4rBQwje68",
    );

    for (const [key, destination] of Object.entries(externalDestinations)) {
      if (key === "googleMaps") continue;
      expect(destination.state).toBe("unverified");
      expect(destination).not.toHaveProperty("url");
      expect(getEnabledExternalUrl(destination)).toBeUndefined();
    }
  });
});

describe("MVP feature settings", () => {
  it("keeps analytics, forms, pricing, booking, and payments disabled", () => {
    expect(siteFeatures).toEqual({
      gallery: { status: "disabled" },
      privacy: { status: "disabled" },
      analytics: { status: "disabled" },
      contactForm: { status: "disabled" },
      pricing: { status: "disabled" },
      booking: { status: "disabled" },
      payments: { status: "disabled" },
    });

    for (const feature of Object.values(siteFeatures)) {
      expect(feature.status).toBe("disabled");
    }
  });
});
