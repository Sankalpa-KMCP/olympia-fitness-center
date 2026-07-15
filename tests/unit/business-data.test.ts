import { describe, expect, it } from "vitest";

import {
  businessAddress,
  businessIdentity,
  poyaHoursNotice,
  primaryContact,
  regularOpeningHours,
} from "../../src/data/business";
import { facilityClaims, serviceCategories } from "../../src/data/services";
import { classContacts, zumbaSchedule } from "../../src/data/zumba";

describe("approved business data", () => {
  it("stores identity, address, and primary contact facts once", () => {
    expect(businessIdentity).toEqual({
      name: "Olympia Fitness Center",
      category: "Gym / fitness centre",
    });
    expect(businessAddress).toEqual({
      streetAddress: "No. 537/2/1, Galle Road",
      locality: "Wadduwa",
      country: "Sri Lanka",
      postalCode: "12560",
      plusCode: "MW8H+6WH, Wadduwa",
    });
    expect(primaryContact).toEqual({
      phone: {
        display: "070 360 9334",
        international: "+94703609334",
      },
      email: "olympiafitnesswadduwa@gmail.com",
    });
  });

  it("preserves split Monday to Saturday hours and separate Sunday hours", () => {
    expect(regularOpeningHours).toEqual([
      {
        days: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
        periods: [
          { opens: "06:00", closes: "12:00" },
          { opens: "16:30", closes: "22:00" },
        ],
      },
      {
        days: ["sunday"],
        periods: [{ opens: "08:00", closes: "13:00" }],
      },
    ]);
    expect(regularOpeningHours[0].periods).toHaveLength(2);
    expect(poyaHoursNotice).toEqual({
      label: "Poya days",
      periods: [{ opens: "08:00", closes: "13:00" }],
    });
  });

  it("contains only the approved services and business-provided facility claims", () => {
    expect(serviceCategories).toEqual([
      { id: "general-fitness", label: "General fitness" },
      {
        id: "personal-training-enquiries",
        label: "Personal-training enquiries",
      },
      { id: "bodybuilding", label: "Bodybuilding" },
      { id: "muscle-gain", label: "Muscle gain" },
      { id: "weight-loss", label: "Weight loss" },
      { id: "strength-training", label: "Strength training" },
      { id: "physique-training", label: "Physique training" },
    ]);
    expect(facilityClaims).toEqual({
      attribution: "business-provided",
      items: [
        "Fully air-conditioned training area",
        "High-quality gym equipment",
        "Spacious workout area",
        "Trainers and personal-training-related services",
      ],
    });
  });

  it("preserves the exact grouped Zumba schedule", () => {
    expect(zumbaSchedule).toEqual([
      {
        days: ["tuesday", "thursday"],
        period: { opens: "18:00", closes: "19:00" },
      },
      {
        days: ["wednesday", "saturday"],
        period: { opens: "08:00", closes: "09:00" },
      },
    ]);
  });

  it("keeps all class contacts anonymous and capability-free", () => {
    expect(classContacts).toEqual([
      { display: "077 740 4804" },
      { display: "077 766 1968" },
      { display: "071 431 9742" },
    ]);

    for (const contact of classContacts) {
      expect(Object.keys(contact)).toEqual(["display"]);
    }
  });
});
