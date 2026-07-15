import { describe, expect, it } from "vitest";

import {
  businessAddress,
  poyaHoursNotice,
  regularOpeningHours,
} from "../../src/data/business";
import {
  formatDayGroup,
  formatLocalTime,
  formatOpeningPeriod,
  formatPostalAddress,
} from "../../src/utils/business-formatting";

describe("shared factual formatting", () => {
  it("keeps weekday split periods and Sunday hours distinct", () => {
    expect(formatDayGroup(regularOpeningHours[0].days)).toBe("Monday–Saturday");
    expect(regularOpeningHours[0].periods.map(formatOpeningPeriod)).toEqual([
      "6:00 a.m.–12:00 p.m.",
      "4:30 p.m.–10:00 p.m.",
    ]);
    expect(formatDayGroup(regularOpeningHours[1].days)).toBe("Sunday");
    expect(regularOpeningHours[1].periods.map(formatOpeningPeriod)).toEqual([
      "8:00 a.m.–1:00 p.m.",
    ]);
    expect(poyaHoursNotice.periods.map(formatOpeningPeriod)).toEqual([
      "8:00 a.m.–1:00 p.m.",
    ]);
  });

  it("formats approved local times and rejects invalid values", () => {
    expect(formatLocalTime("00:00")).toBe("12:00 a.m.");
    expect(formatLocalTime("12:00")).toBe("12:00 p.m.");
    expect(() => formatLocalTime("24:00")).toThrow(TypeError);
  });

  it("formats the postal address from the centralized address record", () => {
    expect(formatPostalAddress(businessAddress)).toBe(
      "No. 537/2/1, Galle Road, Wadduwa, Sri Lanka 12560",
    );
  });
});
