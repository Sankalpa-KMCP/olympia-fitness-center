import type { JsonValue, StructuredData } from "./seo";

export interface PostalAddressStructuredData {
  readonly "@type": "PostalAddress";
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly postalCode: string;
  readonly addressCountry: string;
  readonly [key: string]: JsonValue;
}

export interface OpeningHoursStructuredData {
  readonly "@type": "OpeningHoursSpecification";
  readonly dayOfWeek: readonly string[];
  readonly opens: string;
  readonly closes: string;
  readonly [key: string]: JsonValue;
}

export interface HealthClubStructuredData extends StructuredData {
  readonly "@type": "HealthClub";
  readonly name: string;
  readonly description: string;
  readonly address: PostalAddressStructuredData;
  readonly telephone: string;
  readonly email: string;
  readonly openingHoursSpecification: readonly OpeningHoursStructuredData[];
}
