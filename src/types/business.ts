export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type LocalTime = `${number}:${number}`;
export type InternationalPhoneNumber = `+${number}`;

export interface BusinessIdentity {
  readonly name: string;
  readonly category: string;
}

export interface BusinessAddress {
  readonly streetAddress: string;
  readonly locality: string;
  readonly country: string;
  readonly postalCode: string;
  readonly plusCode: string;
}

export interface PrimaryContact {
  readonly phone: {
    readonly display: string;
    readonly international: InternationalPhoneNumber;
  };
  readonly email: string;
}

export interface OpeningPeriod {
  readonly opens: LocalTime;
  readonly closes: LocalTime;
}

export interface OpeningHoursGroup {
  readonly days: readonly DayOfWeek[];
  readonly periods: readonly OpeningPeriod[];
}

export interface SpecialHoursNotice {
  readonly label: string;
  readonly periods: readonly OpeningPeriod[];
}

export interface ServiceCategory {
  readonly id: string;
  readonly label: string;
}

export interface FacilityClaims {
  readonly attribution: "business-provided";
  readonly items: readonly string[];
}

export interface ZumbaScheduleGroup {
  readonly days: readonly DayOfWeek[];
  readonly period: OpeningPeriod;
}

export interface ClassContact {
  readonly display: string;
}
