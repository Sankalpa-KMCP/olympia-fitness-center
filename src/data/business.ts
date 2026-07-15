import type {
  BusinessAddress,
  BusinessIdentity,
  OpeningHoursGroup,
  PrimaryContact,
  SpecialHoursNotice,
} from "../types/business";

export const businessIdentity = {
  name: "Olympia Fitness Center",
  category: "Gym / fitness centre",
} as const satisfies BusinessIdentity;

export const businessAddress = {
  streetAddress: "No. 537/2/1, Galle Road",
  locality: "Wadduwa",
  country: "Sri Lanka",
  postalCode: "12560",
  plusCode: "MW8H+6WH, Wadduwa",
} as const satisfies BusinessAddress;

export const primaryContact = {
  phone: {
    display: "070 360 9334",
    international: "+94703609334",
  },
  email: "olympiafitnesswadduwa@gmail.com",
} as const satisfies PrimaryContact;

export const regularOpeningHours = [
  {
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    periods: [
      { opens: "06:00", closes: "12:00" },
      { opens: "16:30", closes: "22:00" },
    ],
  },
  {
    days: ["sunday"],
    periods: [{ opens: "08:00", closes: "13:00" }],
  },
] as const satisfies readonly OpeningHoursGroup[];

export const poyaHoursNotice = {
  label: "Poya days",
  periods: [{ opens: "08:00", closes: "13:00" }],
} as const satisfies SpecialHoursNotice;
