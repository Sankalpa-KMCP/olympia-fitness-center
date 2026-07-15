import type {
  DisabledFeatureSetting,
  ExternalDestination,
  ExternalDestinationKey,
  SiteFeatureKey,
} from "../types/external-destination";

export const externalDestinations = {
  whatsapp: {
    label: "WhatsApp",
    state: "unverified",
  },
  googleMaps: {
    label: "Google Maps directions",
    state: "unverified",
  },
  facebook: {
    label: "Facebook",
    state: "unverified",
  },
  instagram: {
    label: "Instagram",
    state: "unverified",
  },
  canonicalOrigin: {
    label: "Canonical site origin",
    state: "unverified",
  },
} as const satisfies Record<ExternalDestinationKey, ExternalDestination>;

export const siteFeatures = {
  gallery: { status: "disabled" },
  privacy: { status: "disabled" },
  analytics: { status: "disabled" },
  contactForm: { status: "disabled" },
  pricing: { status: "disabled" },
  booking: { status: "disabled" },
  payments: { status: "disabled" },
} as const satisfies Record<SiteFeatureKey, DisabledFeatureSetting>;
