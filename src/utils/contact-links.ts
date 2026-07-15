import type { InternationalPhoneNumber } from "../types/business";

export type TelHref = `tel:${InternationalPhoneNumber}`;
export type MailtoHref = `mailto:${string}`;

const allowedPhoneCharacters = /^[+\d\s()-]+$/;
const localSriLankanPhone = /^0\d{9}$/;
const internationalSriLankanPhone = /^\+94\d{9}$/;
const unprefixedSriLankanPhone = /^94\d{9}$/;
const basicEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeSriLankanPhone(
  input: string,
): InternationalPhoneNumber {
  const trimmed = input.trim();

  if (!trimmed || !allowedPhoneCharacters.test(trimmed)) {
    throw new TypeError("A valid Sri Lankan telephone number is required.");
  }

  const compact = trimmed.replace(/[\s()-]/g, "");

  if (localSriLankanPhone.test(compact)) {
    return `+94${compact.slice(1)}` as InternationalPhoneNumber;
  }

  if (internationalSriLankanPhone.test(compact)) {
    return compact as InternationalPhoneNumber;
  }

  if (unprefixedSriLankanPhone.test(compact)) {
    return `+${compact}` as InternationalPhoneNumber;
  }

  throw new TypeError("A valid Sri Lankan telephone number is required.");
}

export function createTelHref(input: string): TelHref {
  return `tel:${normalizeSriLankanPhone(input)}`;
}

export function createMailtoHref(input: string): MailtoHref {
  const email = input.trim();

  if (!basicEmailAddress.test(email)) {
    throw new TypeError("A valid email address is required.");
  }

  return `mailto:${email}`;
}
