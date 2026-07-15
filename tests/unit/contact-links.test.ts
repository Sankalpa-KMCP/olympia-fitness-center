import { describe, expect, it } from "vitest";

import { primaryContact } from "../../src/data/business";
import { classContacts } from "../../src/data/zumba";
import {
  createMailtoHref,
  createTelHref,
  normalizeSriLankanPhone,
} from "../../src/utils/contact-links";

describe("telephone links", () => {
  it("normalizes the main display and international phone forms", () => {
    expect(normalizeSriLankanPhone(primaryContact.phone.display)).toBe(
      primaryContact.phone.international,
    );
    expect(normalizeSriLankanPhone(primaryContact.phone.international)).toBe(
      "+94703609334",
    );
    expect(createTelHref(primaryContact.phone.display)).toBe(
      "tel:+94703609334",
    );
  });

  it.each([
    ["077 740 4804", "+94777404804"],
    ["077 766 1968", "+94777661968"],
    ["071 431 9742", "+94714319742"],
  ])("normalizes class contact %s", (display, expected) => {
    expect(classContacts.some((contact) => contact.display === display)).toBe(
      true,
    );
    expect(normalizeSriLankanPhone(display)).toBe(expected);
    expect(createTelHref(display)).toBe(`tel:${expected}`);
  });

  it.each(["", "   ", "12345", "070-ABC-9334", "+9470360933", "+947036093344"])(
    "rejects malformed telephone input %j",
    (input) => {
      expect(() => normalizeSriLankanPhone(input)).toThrow(TypeError);
      expect(() => createTelHref(input)).toThrow(TypeError);
    },
  );
});

describe("email links", () => {
  it("creates the approved email link", () => {
    expect(createMailtoHref(primaryContact.email)).toBe(
      "mailto:olympiafitnesswadduwa@gmail.com",
    );
  });

  it.each(["", "not-an-email", "name@example", "name @example.com"])(
    "rejects malformed email input %j",
    (input) => {
      expect(() => createMailtoHref(input)).toThrow(TypeError);
    },
  );
});
