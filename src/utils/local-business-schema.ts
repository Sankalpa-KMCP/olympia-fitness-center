import {
  businessAddress,
  businessIdentity,
  primaryContact,
  regularOpeningHours,
} from "../data/business";
import type { DayOfWeek } from "../types/business";
import type {
  HealthClubStructuredData,
  OpeningHoursStructuredData,
} from "../types/local-business-schema";

const schemaDayByDay = {
  monday: "https://schema.org/Monday",
  tuesday: "https://schema.org/Tuesday",
  wednesday: "https://schema.org/Wednesday",
  thursday: "https://schema.org/Thursday",
  friday: "https://schema.org/Friday",
  saturday: "https://schema.org/Saturday",
  sunday: "https://schema.org/Sunday",
} as const satisfies Record<DayOfWeek, string>;

function buildOpeningHoursSpecifications(): readonly OpeningHoursStructuredData[] {
  return regularOpeningHours.flatMap((group) =>
    group.periods.map(
      (period) =>
        ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: group.days.map((day) => schemaDayByDay[day]),
          opens: period.opens,
          closes: period.closes,
        }) satisfies OpeningHoursStructuredData,
    ),
  );
}

export function buildLocalBusinessStructuredData(): HealthClubStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: businessIdentity.name,
    description: businessIdentity.category,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessAddress.streetAddress,
      addressLocality: businessAddress.locality,
      postalCode: businessAddress.postalCode,
      addressCountry: businessAddress.country,
    },
    telephone: primaryContact.phone.international,
    email: primaryContact.email,
    openingHoursSpecification: buildOpeningHoursSpecifications(),
  };
}
