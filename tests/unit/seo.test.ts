import { describe, expect, it } from "vitest";

import { externalDestinations } from "../../src/config/site";
import { createVerifiedExternalDestination } from "../../src/utils/external-destinations";
import {
  createCanonicalHref,
  getRobotsContent,
  serializeStructuredData,
} from "../../src/utils/seo";

describe("baseline metadata safety", () => {
  it("emits no robots directive for indexable content and noindex for technical routes", () => {
    expect(getRobotsContent("index")).toBeUndefined();
    expect(getRobotsContent("noindex")).toBe("noindex, nofollow");
  });

  it("creates a canonical URL only from a verified HTTPS origin and explicit path", () => {
    expect(
      createCanonicalHref(externalDestinations.canonicalOrigin, "/services/"),
    ).toBeUndefined();

    const verifiedOrigin = createVerifiedExternalDestination(
      "Canonical origin",
      "https://example.com/",
    );
    expect(createCanonicalHref(verifiedOrigin, "/services/")).toBe(
      "https://example.com/services/",
    );
    expect(createCanonicalHref(verifiedOrigin)).toBeUndefined();
  });

  it("serializes only an explicit minimal schema object and escapes markup", () => {
    expect(serializeStructuredData(undefined)).toBeUndefined();
    expect(
      serializeStructuredData({ "@type": "Organization" }),
    ).toBeUndefined();
    expect(
      serializeStructuredData({
        "@context": "https://schema.org",
        "@type": "Thing",
        name: "<development boundary>",
      }),
    ).toBe(
      '{"@context":"https://schema.org","@type":"Thing","name":"\\u003cdevelopment boundary>"}',
    );
  });
});
