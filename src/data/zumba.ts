import type { ClassContact, ZumbaScheduleGroup } from "../types/business";

export const zumbaSchedule = [
  {
    days: ["tuesday", "thursday"],
    period: { opens: "18:00", closes: "19:00" },
  },
  {
    days: ["wednesday", "saturday"],
    period: { opens: "08:00", closes: "09:00" },
  },
] as const satisfies readonly ZumbaScheduleGroup[];

export const classContacts = [
  { display: "077 740 4804" },
  { display: "077 766 1968" },
  { display: "071 431 9742" },
] as const satisfies readonly ClassContact[];
