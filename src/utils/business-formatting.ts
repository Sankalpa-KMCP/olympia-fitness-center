import type {
  BusinessAddress,
  DayOfWeek,
  LocalTime,
  OpeningPeriod,
} from "../types/business";

const dayLabels = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
} as const satisfies Record<DayOfWeek, string>;

const dayOrder = Object.keys(dayLabels) as DayOfWeek[];

export function formatDayGroup(days: readonly DayOfWeek[]): string {
  if (days.length === 0) {
    throw new TypeError("At least one day is required.");
  }

  if (days.length === 1) {
    return dayLabels[days[0]];
  }

  const positions = days.map((day) => dayOrder.indexOf(day));
  const isContiguous = positions.every(
    (position, index) => index === 0 || position === positions[index - 1] + 1,
  );

  if (isContiguous) {
    return `${dayLabels[days[0]]}–${dayLabels[days.at(-1)!]}`;
  }

  const labels = days.map((day) => dayLabels[day]);

  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
}

export function formatLocalTime(value: LocalTime): string {
  const match = /^(\d{2}):(\d{2})$/.exec(value);

  if (!match) {
    throw new TypeError("A valid 24-hour local time is required.");
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour > 23 || minute > 59) {
    throw new TypeError("A valid 24-hour local time is required.");
  }

  const period = hour < 12 ? "a.m." : "p.m.";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${match[2]} ${period}`;
}

export function formatOpeningPeriod(period: OpeningPeriod): string {
  return `${formatLocalTime(period.opens)}–${formatLocalTime(period.closes)}`;
}

export function formatPostalAddress(address: BusinessAddress): string {
  return `${address.streetAddress}, ${address.locality}, ${address.country} ${address.postalCode}`;
}
