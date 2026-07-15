export type HttpsUrl = `https://${string}`;

export interface VerifiedExternalDestination {
  readonly label: string;
  readonly state: "verified";
  readonly url: HttpsUrl;
}

export interface InactiveExternalDestination {
  readonly label: string;
  readonly state: "unverified" | "disabled";
  readonly url?: never;
}

export type ExternalDestination =
  VerifiedExternalDestination | InactiveExternalDestination;

export type ExternalDestinationKey =
  "whatsapp" | "googleMaps" | "facebook" | "instagram" | "canonicalOrigin";

export interface DisabledFeatureSetting {
  readonly status: "disabled";
}

export type SiteFeatureKey =
  | "gallery"
  | "privacy"
  | "analytics"
  | "contactForm"
  | "pricing"
  | "booking"
  | "payments";
