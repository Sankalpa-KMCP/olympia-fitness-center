import type { FacilityClaims, ServiceCategory } from "../types/business";

export const serviceCategories = [
  { id: "general-fitness", label: "General fitness" },
  { id: "personal-training-enquiries", label: "Personal-training enquiries" },
  { id: "bodybuilding", label: "Bodybuilding" },
  { id: "muscle-gain", label: "Muscle gain" },
  { id: "weight-loss", label: "Weight loss" },
  { id: "strength-training", label: "Strength training" },
  { id: "physique-training", label: "Physique training" },
] as const satisfies readonly ServiceCategory[];

export const facilityClaims = {
  attribution: "business-provided",
  items: [
    "Fully air-conditioned training area",
    "High-quality gym equipment",
    "Spacious workout area",
    "Trainers and personal-training-related services",
  ],
} as const satisfies FacilityClaims;
